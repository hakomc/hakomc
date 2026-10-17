import type { Plugin } from 'vite';
import type { OutputBundle, NormalizedOutputOptions } from 'rollup';
import { resolve, relative, join } from 'path';
import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import { stableUuid, listFiles, copyDir, cleanDir, writeZip } from './packFiles';

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
  /** リソースパックの素材を置くフォルダ（既定 'resource_pack'） */
  dir?: string,
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
   * スクリプト以外のビヘイビアパックの素材（entities / items / loot_tables / texts など）を置くフォルダ。
   * 既定 'behavior_pack'。フォルダが無ければ何もしない。
   */
  behaviorPack?: { dir?: string },
  /**
   * リソースパックを一緒に作る。既定では 'resource_pack' フォルダがあれば有効になる。false で無効。
   * ビヘイビアパックとリソースパックは互いに依存関係を持つ。
   */
  resourcePack?: ResourcePackConfig | false,
  /** true なら dist/<name>.mcaddon、文字列ならそのパスに .mcaddon を書き出す */
  mcaddon?: boolean | string,
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
  behaviorPack = {},
  resourcePack,
  mcaddon = false,
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
  const bpDir = resolve(process.cwd(), behaviorPack.dir ?? 'behavior_pack');
  const rpConfig: ResourcePackConfig | undefined = resourcePack === false
    ? undefined
    : resourcePack ?? (fs.existsSync(resolve(process.cwd(), 'resource_pack')) ? {} : undefined);
  const rpDir = rpConfig ? resolve(process.cwd(), rpConfig.dir ?? 'resource_pack') : undefined;
  const rpUUID = rpConfig ? (rpConfig.uuid ?? derive('resource_pack')) : undefined;
  const rpVersion = rpConfig?.version ?? version;

  return {
  name: 'BehaviorPacker',

  buildStart() {
    // vite build --watch のとき、素材フォルダの変更でも作り直す
    for (const f of [...listFiles(bpDir), ...(rpDir ? listFiles(rpDir) : [])]) this.addWatchFile(f);
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

    const hasBpAssets = fs.existsSync(bpDir);
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
    const skipped = listFiles(bpDir).map((f) => relative(bpDir, f).split('\\').join('/')).filter((r) => r === 'manifest.json' || r.startsWith('scripts/'));
    if (skipped.length) this.warn(`${relative(process.cwd(), bpDir)} の ${skipped.join(', ')} は生成物と重なるのでコピーしない（manifest は manifest オプションで上書きできる）`);
    copyDir(bpDir, DIST_BP, ['manifest.json', 'scripts']);
    fs.writeFileSync(join(DIST_BP, 'manifest.json'), JSON.stringify(finalManifest, null, 2));

    if (rpConfig && rpDir && rpUUID) {
      cleanDir(DIST_RP);
      fs.mkdirSync(DIST_RP, { recursive: true });
      copyDir(rpDir, DIST_RP, ['manifest.json']);
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
