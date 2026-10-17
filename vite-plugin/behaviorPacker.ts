import type { Plugin } from 'vite';
import type { OutputBundle, NormalizedOutputOptions } from 'rollup';
import { resolve, relative, join } from 'path';
import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import { stableUuid, listFiles, cleanDir, writeZip, routeAssets, copyRouted, ASSET_ROUTES, writeJsonFiles, writeLang } from './packFiles';
import { loadPack, PackLoadError } from './packLoader';
import type { PackFiles } from '../core/entity/entity';

type ManifestStub = {
  format_version?: number,
  header?: {
    name?: string,
    description?: string,
    uuid?: string,
    version?: number[],
    min_engine_version?: number[],
    [key: string]: unknown,
  },
  modules?: Array<{
    description?: string,
    type?: string,
    language?: string,
    uuid?: string,
    version?: number[],
    entry?: string,
    [key: string]: unknown,
  }>,
  dependencies?: Array<{
    /** スクリプト API への依存 */
    module_name?: string,
    /** 他のパックへの依存 */
    uuid?: string,
    version?: string | number[],
    [key: string]: unknown,
  }>,
  metadata?: {
    authors?: string[],
    [key: string]: unknown,
  },
  [key: string]: unknown,
};

type ResourcePackConfig = {
  /** 省略時はビヘイビアパックの uuid から毎回同じ値を作る */
  uuid?: string,
  name?: string,
  description?: string,
  version?: number[],
  /** 生成したマニフェストに上書きする内容 */
  manifest?: ManifestStub,
};

type PluginConfig = {
  name: string,
  uuid?: string,
  description?: string,
  authors?: string[],
  version?: number[],
  embedSourceMap?: boolean,
  manifest?: ManifestStub,
  /**
   * 画像・音などのファイルを置くフォルダ（既定 'assets'）。中身は次のように振り分ける。
   * - textures/ sounds/ models/ particles/ font/ → リソースパック
   * - structures/ functions/ → ビヘイビアパック
   * - behavior/ と resource/ の中身 → それぞれのパックの直下（JSON を直接置きたいとき）
   * - 直下の pack_icon.png → 両方
   */
  assetsDir?: string,
  /**
   * リソースパックの設定。既定では、リソースパックに入るファイルがあれば作る。false で作らない。
   * ビヘイビアパックとリソースパックは互いに依存関係を持つ。
   */
  resourcePack?: ResourcePackConfig | false,
  /** true なら dist/<name>.mcaddon、文字列ならそのパスに .mcaddon を書き出す */
  mcaddon?: boolean | string,
  /**
   * エンティティなどの定義（hakomc/entity）を default export するファイル。既定 'src/pack.ts'（あれば）。
   * ビルド時に読み込み、BP / RP の JSON とローカライズを作る。false で使わない。
   */
  pack?: string | false,
};

const DIST_BP = 'dist/behavior_pack';
const DIST_RP = 'dist/resource_pack';

const mergeArrayByKey = <T extends Record<string, unknown>>(
  target: T[],
  source: T[],
  key: string
): T[] => {
  const result = [...target];
  for (const sourceItem of source) {
    const keyValue = sourceItem[key];
    const existingIndex = key === 'module_name'
      ? result.findIndex(item => dependencyKey(item) === dependencyKey(sourceItem))
      : result.findIndex(item => item[key] === keyValue);
    if (existingIndex >= 0) {
      result[existingIndex] = { ...result[existingIndex], ...sourceItem };
    } else {
      result.push(sourceItem);
    }
  }
  return result;
};

const ARRAY_MERGE_KEYS: Record<string, string> = {
  dependencies: 'module_name',
  modules: 'type',
};

/** dependencies は module_name（スクリプト API）か uuid（パック）のどちらかで同じものを見分ける */
const dependencyKey = (d: Record<string, unknown>) => (d.module_name ?? d.uuid) as unknown;

const deepMerge = <T extends Record<string, unknown>>(target: T, source: Partial<T>): T => {
  const result = { ...target };
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = target[key];
    if (Array.isArray(sourceValue) && Array.isArray(targetValue) && ARRAY_MERGE_KEYS[key]) {
      result[key] = mergeArrayByKey(
        targetValue as Record<string, unknown>[],
        sourceValue as Record<string, unknown>[],
        ARRAY_MERGE_KEYS[key]
      ) as T[typeof key];
    } else if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue) &&
        targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)) {
      result[key] = deepMerge(targetValue as Record<string, unknown>, sourceValue as Record<string, unknown>) as T[typeof key];
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue as T[typeof key];
    }
  }
  return result;
};

const behaviorPacker = ({
  name = 'my first plugin',
  uuid,
  description = '',
  authors = [],
  version = [1, 0, 0],
 embedSourceMap = true,
  manifest: manifestOverride,
  assetsDir = 'assets',
  resourcePack,
  mcaddon = false,
  pack,
}: PluginConfig = {
  name: 'my first plugin',
  description: '',
  authors: [],
  version: [1, 0, 0],
  embedSourceMap: true,
}): Plugin => {
  // UUID はプラグインを作った時点で決める（watch で作り直しても変わらないように）。
  // uuid を指定していれば、モジュールやリソースパックの UUID もそこから毎回同じ値になる。
  const behaviorUUID = uuid ?? crypto.randomUUID();
  const derive = (what: string) => (uuid ? stableUuid(`${uuid}:${what}`) : crypto.randomUUID());
  const scriptModuleUUID = derive('script');
  const dataModuleUUID = derive('data');
  const assetsPath = resolve(process.cwd(), assetsDir);
  const rpUUIDFor = (cfg: ResourcePackConfig) => cfg.uuid ?? derive('resource_pack');
  const rpVersion = (resourcePack || undefined)?.version ?? version;
  // 既定では、src/pack.ts があればそれ、無ければスクリプトの入口（src/index.ts）から register() されたエンティティを集める
  const autoEntry = pack === undefined;
  const packEntry = pack === false ? undefined
    : pack ?? (['src/pack.ts', 'src/index.ts'].find((f) => fs.existsSync(resolve(process.cwd(), f))));
  let packFiles: PackFiles | undefined;

  return {
  name: 'BehaviorPacker',

  async buildStart() {
    // vite build --watch のとき、assets の変更でも作り直す。
    // ファイルではなくフォルダごと登録する（後から足したファイルも拾うため。フォルダがまだ無くても、作られれば拾う）
    this.addWatchFile(assetsPath);
    // 定義（src/pack.ts）を読み込んで JSON を作る。定義から辿ったファイルも監視する
    packFiles = undefined;
    if (packEntry) {
      try {
        const loaded = await loadPack(packEntry);
        packFiles = loaded.entities ? loaded.files : undefined;
        for (const f of loaded.watchFiles) this.addWatchFile(f);
        for (const w of packFiles?.warnings ?? []) this.warn(w);
      } catch (e) {
        const err = e instanceof PackLoadError ? e : new PackLoadError(String(e), 0, false);
        // エンティティを使っていないプロジェクトで、スクリプトの入口が模擬環境で動かないだけなら、止めずに知らせる
        if (autoEntry && packEntry === 'src/index.ts' && !err.registered && !err.isDefinitionError) {
          this.warn(`エンティティの定義を集めるために ${packEntry} を模擬環境で読み込んだが、失敗した（エンティティを使っていなければ問題ない。使っているなら src/pack.ts を置くか、トップレベルの処理を system.run の中に移す）: ${err.message}`);
        } else {
          this.error(`${packEntry} からエンティティの定義を作れなかった: ${err.message}`);
        }
      }
    }
  },
  
  config: () => {
    return {
      build: {
        sourcemap: true,
        minify: false,
        outDir: 'dist/behavior_pack/scripts',
        emptyOutDir: true,
        assetsDir: '',
        rollupOptions: {
          external: [
            '@minecraft/server',
            '@minecraft/server-net',
            '@minecraft/server-ui',
            '@minecraft/server-admin',
          ],
          input: {
            index: resolve(process.cwd(), './src/index.ts'),
          },
        },
      },
    };
  },

  generateBundle(options: NormalizedOutputOptions, bundle: OutputBundle) {
    if (!embedSourceMap) return;

    // バンドル内のチャンクとソースマップを処理
    for (const [, file] of Object.entries(bundle)) {
      if (file.type === 'chunk' && file.map) {
        const sourceMapData = file.map;
        
        const projectRoot = process.cwd();
        const outputDir = resolve(projectRoot, options.dir || 'dist/behavior_pack/scripts');

        const embeddedSourceMap = {
          version: sourceMapData.version,
          sources: sourceMapData.sources.map(source => {
            const absolutePath = resolve(outputDir, source);
            return relative(projectRoot, absolutePath);
          }),
          sourcesContent: sourceMapData.sourcesContent,
          mappings: sourceMapData.mappings,
          names: sourceMapData.names,
          _offset: 4, // 埋め込みコードで追加される行数（4行）
        };

        // ソースマップをグローバル変数として埋め込む
        const sourceMapEmbed = `// ========== Embedded Source Map ==========
globalThis.__SOURCE_MAP__ = ${JSON.stringify(embeddedSourceMap)};
// ========== End of Embedded Source Map ==========

`;

        // 外部ソースマップURLコメントを削除（埋め込みJSONを結合する前に行う。
        // sourcesContentにはビルド済み依存パッケージ由来の
        // `//# sourceMappingURL=...` 文字列がそのまま含まれることがあり、
        // 結合後に置換すると埋め込みJSONごと巻き込んで壊してしまうため）
        const cleanedCode = file.code.replace(/\/\/# sourceMappingURL=.+$/gm, '');
        file.code = sourceMapEmbed + cleanedCode;

        // ソースマップファイルを削除（埋め込み済みなので不要）
        file.map = null;
      }
    }

    // .mapファイルを削除
    /**for (const fileName in bundle) {
      if (fileName.endsWith('.map')) {
        delete bundle[fileName];
      }
    }*/
  },

  async writeBundle(_options: NormalizedOutputOptions, bundle: OutputBundle) {
    const entryFile = Object.values(bundle).find(
      (file) => file.type === 'chunk' && file.isEntry
    );

    if (!entryFile || entryFile.type !== 'chunk') {
      throw new Error('No entry file found');
    }

    const assets = routeAssets(assetsPath);
    const where = relative(process.cwd(), assetsPath).split('\\').join('/');
    const generated = assets.skipped.filter((x) => x.reason === 'generated').map((x) => x.rel);
    const unknown = assets.skipped.filter((x) => x.reason === 'unknown').map((x) => x.rel);
    if (generated.length) this.warn(`${where} の ${generated.join(', ')} は生成物と重なるのでコピーしない（manifest は manifest オプションで上書きできる）`);
    if (unknown.length) this.warn(`${where} の ${unknown.join(', ')} は入れる先のパックが分からないのでコピーしない。${Object.keys(ASSET_ROUTES).join('/')}/ のどれかに置くか、behavior/ か resource/ の下に置く`);
    // 既定では、リソースパックに入るファイルがあるときだけ作る
    const genBp = Object.keys(packFiles?.behavior ?? {}).length;
    const genRp = Object.keys(packFiles?.resource ?? {}).length + Object.keys(packFiles?.lang ?? {}).length;
    const rpConfig: ResourcePackConfig | undefined = resourcePack === false
      ? undefined
      : resourcePack ?? (assets.rp.length || genRp ? {} : undefined);
    if (resourcePack === false && assets.rp.length) this.warn(`resourcePack: false なので、${where} のリソースパック用のファイル（${assets.rp.length} 個）は使わない`);
    if (resourcePack === false && genRp) this.warn(`resourcePack: false なので、${packEntry} から作った見た目・ローカライズは使わない`);
    const rpUUID = rpConfig ? rpUUIDFor(rpConfig) : undefined;
    const hasBpAssets = assets.bp.length > 0 || genBp > 0;
    const manifestStub: ManifestStub = {
      'format_version': 2,
      'header': {
        'name': name,
        'description': description,
        'uuid': behaviorUUID,
        'version': version,
        'min_engine_version': [1, 21, 120]
      },
      'modules': [
        {
          'description': 'script',
          'type': 'script',
          'language': 'javascript',
          'uuid': scriptModuleUUID,
          'version': [1, 0, 0],
          'entry': `scripts/${entryFile.fileName}`,
        },
        ...(hasBpAssets ? [{ 'description': 'data', 'type': 'data', 'uuid': dataModuleUUID, 'version': [1, 0, 0] }] : []),
      ],
      'dependencies': [
        {
          'module_name': '@minecraft/server',
          'version': '2.8.0'
        },
        {
          'module_name': '@minecraft/server-ui',
          'version': '2.1.0'
        },
        ...(rpUUID ? [{ 'uuid': rpUUID, 'version': rpVersion }] : []),
      ],
      'metadata': {
        'authors': authors,
      }
    };

    const finalManifest = manifestOverride
      ? deepMerge(manifestStub, manifestOverride)
      : manifestStub;

    // ビヘイビアパックの素材（scripts は vite の出力なので残す）
    cleanDir(DIST_BP, ['scripts']);
    copyRouted(assets.bp, DIST_BP);
    if (packFiles) {
      // assets に同じパスのファイルがあれば、定義から作ったほうで上書きする（警告を出す）
      const clash = Object.keys(packFiles.behavior).filter((p) => fs.existsSync(join(DIST_BP, p)));
      if (clash.length) this.warn(`${clash.join(', ')} は ${packEntry} の定義から作ったもので上書きする（assets 側を消してください）`);
      writeJsonFiles(DIST_BP, packFiles.behavior);
    }
    fs.writeFileSync(join(DIST_BP, 'manifest.json'), JSON.stringify(finalManifest, null, 2));

    // リソースパックは全て生成物なので、毎回作り直す（無効にしたら消す）
    fs.rmSync(DIST_RP, { recursive: true, force: true });
    if (rpConfig && rpUUID) {
      fs.mkdirSync(DIST_RP, { recursive: true });
      copyRouted(assets.rp, DIST_RP);
      if (packFiles) {
        const clash = Object.keys(packFiles.resource).filter((p) => fs.existsSync(join(DIST_RP, p)));
        if (clash.length) this.warn(`${clash.join(', ')} は ${packEntry} の定義から作ったもので上書きする（assets 側を消してください）`);
        writeJsonFiles(DIST_RP, packFiles.resource);
        const replaced = writeLang(DIST_RP, packFiles.lang);
        for (const [code, keys] of Object.entries(replaced)) {
          this.warn(`texts/${code}.lang の ${keys.join(', ')} は ${packEntry} の定義から作ったもので置き換える（assets 側を消してください）`);
        }
      }
      const rpStub: ManifestStub = {
        'format_version': 2,
        'header': {
          'name': rpConfig.name ?? `${name} resources`,
          'description': rpConfig.description ?? description,
          'uuid': rpUUID,
          'version': rpVersion,
          'min_engine_version': (finalManifest.header?.min_engine_version as number[]) ?? [1, 21, 120],
        },
        'modules': [
          { 'description': 'resources', 'type': 'resources', 'uuid': derive('resources'), 'version': [1, 0, 0] },
        ],
        'dependencies': [
          { 'uuid': behaviorUUID, 'version': version },
        ],
        'metadata': { 'authors': authors },
      };
      const rpManifest = rpConfig.manifest ? deepMerge(rpStub, rpConfig.manifest) : rpStub;
      fs.writeFileSync(join(DIST_RP, 'manifest.json'), JSON.stringify(rpManifest, null, 2));
    }

    if (mcaddon) {
      const out = typeof mcaddon === 'string' ? mcaddon : `dist/${name.replace(/[\\/:*?"<>|]/g, '_')}.mcaddon`;
      const entries = [
        ...listFiles(DIST_BP).map((f) => ({ path: `behavior_pack/${relative(DIST_BP, f).split('\\').join('/')}`, data: fs.readFileSync(f) })),
        ...(rpConfig ? listFiles(DIST_RP).map((f) => ({ path: `resource_pack/${relative(DIST_RP, f).split('\\').join('/')}`, data: fs.readFileSync(f) })) : []),
      ];
      writeZip(out, entries);
    }
  },
  };
};

export default behaviorPacker;
