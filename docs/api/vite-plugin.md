# Vite Plugin (`hakomc/vite-plugin`): behaviorPacker

[English](#english) | [日本語](#日本語)

`import { behaviorPacker } from 'hakomc/vite-plugin';`

## English

Builds `src/index.ts` into a behavior pack and writes its `manifest.json`. It can also copy files from `assets/` into the behavior pack and a resource pack, and package both as a `.mcaddon`.

Definitions (entities, animations, localisation…) are meant to be written in TypeScript and generated (see the entity DSL, coming next). `assets/` is for what cannot be generated: images, sounds, structures and models made in external tools.

### Project layout

```
my-addon/
├─ src/index.ts                → dist/behavior_pack/scripts/
├─ assets/                     (optional)
│   ├─ textures/ sounds/ models/ particles/ font/   → dist/resource_pack/<same folder>/
│   ├─ structures/ functions/                       → dist/behavior_pack/<same folder>/
│   ├─ pack_icon.png                                → both packs
│   ├─ behavior/               → dist/behavior_pack/   (anything else, e.g. hand-written JSON)
│   └─ resource/               → dist/resource_pack/
└─ vite.config.ts
```

Both packs have folders with the same name but different meaning (`entities/`, `texts/`…), so anything outside the folders above goes under `behavior/` or `resource/`. Other files are skipped with a warning.

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { behaviorPacker } from 'hakomc/vite-plugin';

export default defineConfig({
  plugins: [
    behaviorPacker({
      name: 'My Boss',
      uuid: '82b9174d-ea3d-42ae-986c-b42ce3644760', // fix it so the world keeps recognising the pack
      mcaddon: true,                               // also writes dist/My Boss.mcaddon
    }),
  ],
});
```

Existing configs keep working: without `assets/`, the output is the same as before.

### What it does

| Item | Behaviour |
| --- | --- |
| Behavior pack files | Copied as described above. A `data` module is added to the manifest. `behavior/manifest.json`, `behavior/scripts/` and `resource/manifest.json` are skipped with a warning, because the plugin generates them |
| Resource pack | Built when some file goes to it (or `resourcePack` is set). The manifest is generated, and the two packs depend on each other (players get both) |
| UUIDs | When `uuid` is set, every module UUID and the resource pack UUID are derived from it, so they stay the same on every build. Without `uuid` they are random each time (same as before) |
| Stale files | Files deleted from `assets/` are also removed from `dist/` on the next build |
| `vite build --watch` | Changes in `assets/` trigger a rebuild |
| `.mcaddon` | A ZIP holding `behavior_pack/` and `resource_pack/` |

### Options

| Option | Default | Description |
| --- | --- | --- |
| `name` | (required) | Pack name |
| `uuid` | random | Behavior pack header UUID. Set it |
| `description` / `authors` / `version` | | Manifest header and metadata |
| `embedSourceMap` | | Embed the source map in the script |
| `manifest` | | Merged into the generated behavior pack manifest (`dependencies` merge by `module_name` / `uuid`) |
| `assetsDir` | `'assets'` | Folder with the files to copy |
| `resourcePack` | on if some file goes to it | `false` disables it. Or an object: `uuid`, `name` (default `<name> resources`), `description`, `version` (default: the behavior pack's), `manifest` (merged into the generated one) |
| `mcaddon` | `false` | `true` → `dist/<name>.mcaddon`; a string → that path |
| `pack` | `'src/pack.ts'` if it exists, else `'src/index.ts'` | Read at build time (with `@minecraft/server` replaced by the simulated one) to generate the JSON and localisation of [`hakomc/entity`](entity.md) entities: those `register()`ed while loading, or the ones in a default-exported `definePack({ ... })`. `false` disables it |
| `checkRefs` | `true` | After the build, check that what the resource pack's client entities refer to — geometry identifiers, texture paths, animations / animation controllers, render controllers — exists in the pack, and warn when it does not (vanilla references also warn; ignore those) |

## 日本語

`src/index.ts` をビヘイビアパックとしてビルドし、`manifest.json` を書き出します。あわせて、`assets/` のファイルをビヘイビアパックとリソースパックに振り分けてコピーし、両方をまとめた `.mcaddon` も書き出せます。

エンティティ・アニメーション・ローカライズなどの定義は、TypeScript で書いて生成する想定です（次に作るエンティティ定義の DSL）。`assets/` に置くのは、生成できないもの（画像・音・ストラクチャー・外部ツールで作ったモデル）です。

### フォルダ構成

```
my-addon/
├─ src/index.ts                → dist/behavior_pack/scripts/
├─ assets/                     （任意）
│   ├─ textures/ sounds/ models/ particles/ font/   → dist/resource_pack/<同じフォルダ>/
│   ├─ structures/ functions/                       → dist/behavior_pack/<同じフォルダ>/
│   ├─ pack_icon.png                                → 両方のパック
│   ├─ behavior/               → dist/behavior_pack/   （それ以外。手書きの JSON など）
│   └─ resource/               → dist/resource_pack/
└─ vite.config.ts
```

両方のパックに、同じ名前で中身の違うフォルダ（`entities/`・`texts/` など）があるので、上の一覧に無いものは `behavior/` か `resource/` の下に置きます。それ以外のファイルはコピーせず警告を出します。

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { behaviorPacker } from 'hakomc/vite-plugin';

export default defineConfig({
  plugins: [
    behaviorPacker({
      name: 'My Boss',
      uuid: '82b9174d-ea3d-42ae-986c-b42ce3644760', // 固定しておくと、ワールドが同じパックとして認識し続ける
      mcaddon: true,                               // dist/My Boss.mcaddon も書き出す
    }),
  ],
});
```

今の設定はそのまま動きます。`assets/` が無ければ、出力はこれまでと同じです。

### やること

| 項目 | 内容 |
| --- | --- |
| ビヘイビアパックのファイル | 上の振り分けでコピーし、マニフェストに `data` モジュールを足す。`behavior/manifest.json`・`behavior/scripts/`・`resource/manifest.json` はプラグインが生成するものと重なるので、コピーせず警告を出す |
| リソースパック | 入るファイルがあれば（または `resourcePack` を指定すれば）作る。マニフェストは自動生成で、BP と RP は互いに依存する（プレイヤーには両方が配られる） |
| UUID | `uuid` を指定すると、各モジュールとリソースパックの UUID をそこから作るので、ビルドのたびに同じになる。指定しなければ毎回ランダム（これまで通り） |
| 古いファイル | `assets/` から消したファイルは、次のビルドで `dist/` からも消える |
| `vite build --watch` | `assets/` の変更でも再ビルドされる |
| `.mcaddon` | `behavior_pack/` と `resource_pack/` を入れた ZIP |

### オプション

| オプション | 既定 | 内容 |
| --- | --- | --- |
| `name` | （必須） | パック名 |
| `uuid` | ランダム | ビヘイビアパックの header の UUID。指定してください |
| `description` / `authors` / `version` | | マニフェストの header と metadata |
| `embedSourceMap` | | ソースマップをスクリプトに埋め込む |
| `manifest` | | 生成したビヘイビアパックのマニフェストに上書きする内容（`dependencies` は `module_name` / `uuid` ごとにまとめる） |
| `assetsDir` | `'assets'` | コピーするファイルを置くフォルダ |
| `resourcePack` | 入るファイルがあれば有効 | `false` で無効。オブジェクトなら `uuid`・`name`（既定 `<name> resources`）・`description`・`version`（既定はビヘイビアパックと同じ）・`manifest`（生成したものに上書き） |
| `mcaddon` | `false` | `true` なら `dist/<name>.mcaddon`、文字列ならそのパス |
| `pack` | `'src/pack.ts'`（あれば）、無ければ `'src/index.ts'` | ビルド時に（`@minecraft/server` を模擬に差し替えて）読み込み、[`hakomc/entity`](entity.md) のエンティティの JSON とローカライズを作る。対象は、読み込み中に `register()` されたもの、または default export した `definePack({ ... })` のもの。`false` で使わない |
| `checkRefs` | `true` | ビルドの最後に、リソースパックのクライアント側のエンティティ定義が参照しているもの（geometry の識別子・テクスチャのパス・アニメーション / アニメーションコントローラー・レンダーコントローラー）がパックの中にあるか確かめ、無ければ警告する（バニラのものを参照していても警告が出るので、その場合は無視してよい） |
