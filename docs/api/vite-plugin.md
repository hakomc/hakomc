# Vite Plugin (`hakomc/vite-plugin`): behaviorPacker

[English](#english) | [日本語](#日本語)

`import { behaviorPacker } from 'hakomc/vite-plugin';`

## English

Builds `src/index.ts` into a behavior pack and writes its `manifest.json`. It can also copy the behavior pack's other files, build a resource pack beside it, and package both as a `.mcaddon`.

### Project layout

```
my-addon/
├─ src/index.ts            → dist/behavior_pack/scripts/
├─ behavior_pack/          → dist/behavior_pack/   (optional: entities, items, loot_tables, texts…)
├─ resource_pack/          → dist/resource_pack/   (optional: textures, models, animations…)
└─ vite.config.ts
```

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

Existing configs keep working: if `behavior_pack/` and `resource_pack/` do not exist, the output is the same as before.

### What it does

| Item | Behaviour |
| --- | --- |
| Behavior pack files | Everything in `behavior_pack/` is copied. A `data` module is added to the manifest. `manifest.json` and `scripts/` in that folder are skipped with a warning, because the plugin generates them |
| Resource pack | Built when `resource_pack/` exists. The manifest is generated, and the two packs depend on each other (players get both) |
| UUIDs | When `uuid` is set, every module UUID and the resource pack UUID are derived from it, so they stay the same on every build. Without `uuid` they are random each time (same as before) |
| Stale files | Files deleted from the source folders are also removed from `dist/` on the next build |
| `vite build --watch` | Changes in the source folders trigger a rebuild |
| `.mcaddon` | A ZIP holding `behavior_pack/` and `resource_pack/` |

### Options

| Option | Default | Description |
| --- | --- | --- |
| `name` | (required) | Pack name |
| `uuid` | random | Behavior pack header UUID. Set it |
| `description` / `authors` / `version` | | Manifest header and metadata |
| `embedSourceMap` | | Embed the source map in the script |
| `manifest` | | Merged into the generated behavior pack manifest (`dependencies` merge by `module_name` / `uuid`) |
| `behaviorPack.dir` | `'behavior_pack'` | Folder with the behavior pack files |
| `resourcePack` | on if `resource_pack/` exists | `false` disables it. Or an object: `dir`, `uuid`, `name` (default `<name> resources`), `description`, `version` (default: the behavior pack's), `manifest` (merged into the generated one) |
| `mcaddon` | `false` | `true` → `dist/<name>.mcaddon`; a string → that path |

## 日本語

`src/index.ts` をビヘイビアパックとしてビルドし、`manifest.json` を書き出します。あわせて、スクリプト以外のビヘイビアパックの素材のコピー、リソースパックの作成、両方をまとめた `.mcaddon` の書き出しもできます。

### フォルダ構成

```
my-addon/
├─ src/index.ts            → dist/behavior_pack/scripts/
├─ behavior_pack/          → dist/behavior_pack/   （任意: entities・items・loot_tables・texts など）
├─ resource_pack/          → dist/resource_pack/   （任意: textures・models・animations など）
└─ vite.config.ts
```

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

今の設定はそのまま動きます。`behavior_pack/` と `resource_pack/` が無ければ、出力はこれまでと同じです。

### やること

| 項目 | 内容 |
| --- | --- |
| ビヘイビアパックの素材 | `behavior_pack/` の中身を全てコピーし、マニフェストに `data` モジュールを足す。そのフォルダ内の `manifest.json` と `scripts/` はプラグインが生成するものと重なるので、コピーせず警告を出す |
| リソースパック | `resource_pack/` があれば作る。マニフェストは自動生成で、BP と RP は互いに依存する（プレイヤーには両方が配られる） |
| UUID | `uuid` を指定すると、各モジュールとリソースパックの UUID をそこから作るので、ビルドのたびに同じになる。指定しなければ毎回ランダム（これまで通り） |
| 古いファイル | 素材フォルダから消したファイルは、次のビルドで `dist/` からも消える |
| `vite build --watch` | 素材フォルダの変更でも再ビルドされる |
| `.mcaddon` | `behavior_pack/` と `resource_pack/` を入れた ZIP |

### オプション

| オプション | 既定 | 内容 |
| --- | --- | --- |
| `name` | （必須） | パック名 |
| `uuid` | ランダム | ビヘイビアパックの header の UUID。指定してください |
| `description` / `authors` / `version` | | マニフェストの header と metadata |
| `embedSourceMap` | | ソースマップをスクリプトに埋め込む |
| `manifest` | | 生成したビヘイビアパックのマニフェストに上書きする内容（`dependencies` は `module_name` / `uuid` ごとにまとめる） |
| `behaviorPack.dir` | `'behavior_pack'` | ビヘイビアパックの素材のフォルダ |
| `resourcePack` | `resource_pack/` があれば有効 | `false` で無効。オブジェクトなら `dir`・`uuid`・`name`（既定 `<name> resources`）・`description`・`version`（既定はビヘイビアパックと同じ）・`manifest`（生成したものに上書き） |
| `mcaddon` | `false` | `true` なら `dist/<name>.mcaddon`、文字列ならそのパス |
