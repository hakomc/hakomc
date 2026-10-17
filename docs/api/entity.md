# Entity API (`hakomc/entity`)

[English](#english) | [日本語](#日本語)

`import { entity, BoolProperty, EntityEvent, ComponentGroup, health } from 'hakomc/entity';`

## English

Define custom entities in TypeScript. At build time `behaviorPacker` turns the definitions into the behavior pack entity JSON, the resource pack client entity and the localisation files. The same classes are used from your scripts, so property and event names cannot drift apart.

### Example

```ts
// src/entities/morgrave.ts
import {
  BoolProperty, ComponentGroup, EntityEvent, EnumProperty, entity, health, movement, set, timer, type Component,
} from 'hakomc/entity';

class IsAngry extends BoolProperty('is_angry', false, { client: true }) {}
class Phase extends EnumProperty('phase', ['idle', 'bite', 'roar'], 'idle', { client: true }) {}

// Angry and Calm refer to each other. Write the type (Component[]) where there is a cycle
class Angry extends ComponentGroup {
  components: Component[] = [movement({ value: 0.35 }), timer({ time: 30, time_down_event: Calm })];
}
class Enrage extends EntityEvent {
  static readonly id = 'enrage';
  add = [Angry];
  set = [set(IsAngry, true), set(Phase, 'roar')];
}
class Calm extends EntityEvent {
  static readonly id = 'calm';
  remove = [Angry];
  set = [set(IsAngry, false), set(Phase, 'idle')];
}

export class Morgrave extends entity('hako:morgrave', {
  name: { en_US: 'Morgrave', ja_JP: 'モルグレイヴ' },
  properties: [IsAngry, Phase],
  components: [health({ value: 600, max: 600 })],
  events: [Enrage],
  client: { geometry: 'geometry.morgrave', textures: 'textures/entity/morgrave' },
}) {
  enrage() {
    if (!this.get(IsAngry)) this.trigger(Enrage);
  }
}
```

```ts
// src/pack.ts — read by behaviorPacker at build time
import { definePack } from 'hakomc/entity';
import { Morgrave } from './entities/morgrave';
export default definePack({ entities: [Morgrave] });
```

```ts
// src/index.ts — scripts
import { world } from '@minecraft/server';
import { Morgrave } from './entities/morgrave';

world.afterEvents.entityHurt.subscribe(({ hurtEntity }) => {
  if (Morgrave.is(hurtEntity)) Morgrave.of(hurtEntity).enrage();
});
```

Images, sounds and models go in `assets/` (see [Vite Plugin](vite-plugin.md)).

### Building blocks

| | How to write | JSON name |
| --- | --- | --- |
| Property | `class X extends BoolProperty(id, default, { client })` — also `IntProperty` / `FloatProperty` (`range`) and `EnumProperty(id, values, default)` | `<namespace>:<id>`. `id` is required: changing it would lose values saved in worlds |
| Component | `health({ ... })`, `behaviorMeleeAttack({ ... })` … — every `minecraft:` component. The name is the component name without `minecraft:`, in camelCase; the fields are the official ones | as is |
| Group | `class X extends ComponentGroup { components = [...] }` | `static id`, or the class name in snake_case |
| Event | `class X extends EntityEvent { static readonly id = '…'; add; remove; set; trigger; extra }` | `<namespace>:<id>`. `id` is required (used by `/event entity`) |
| Entity | `entity(id, { name, properties, components, events, groups, client, … })` | |

Groups and events reachable from `events` (through `add`, `remove`, `trigger` and event fields of components such as `timer`) are collected automatically, even when they refer to each other.

Where a component field names an event (`time_down_event`, `on_damage`'s `event`, …), you can pass the event class instead of a string. Built-in events like `minecraft:entity_spawned` stay strings.

A component that has no type yet: `component('minecraft:new_thing', { ... })`. Event JSON with no dedicated field yet (`sequence`, `randomize`, `queue_command`…): `extra`.

### Caught by the type checker

- Reading or writing a property the entity does not declare; `trigger` with an event not in `events`
- A value of the wrong type (`set(IsAngry, 'yes')`), an enum value that does not exist, an enum default not in `values`
- A misspelt component field (`health({ valu: 1 })`) or a wrong value type
- A group where an event is expected, an event without `static readonly id`

### Caught at build time

Malformed identifiers, duplicate names (properties, events, groups, entities), defaults outside `range` / `values`, the same component twice. The build stops with a message.

### Script side

| Member | |
| --- | --- |
| `Morgrave.is(entity)` | `typeId` matches |
| `Morgrave.of(entity)` | An instance of your class for that entity |
| `this.entity` | The `Entity` |
| `get(P)` / `set(P, value)` | Typed `getProperty` / `setProperty`. Values set are readable at the end of the tick (game behaviour) |
| `trigger(E)` | `triggerEvent` |
| `Morgrave.propertyName(P)` / `Morgrave.eventName(E)` | The JSON name, for `/event`, molang, etc. |

Instances are thin wrappers: create them when you need them. Fields you add to your class are **not** saved; use properties for anything that must survive chunk unloads and restarts.

### Updating the components

The component types and functions are generated from the JSON schemas in [`@minecraft/bedrock-schemas`](https://www.npmjs.com/package/@minecraft/bedrock-schemas) (Mojang, MIT). After upgrading it:

```bash
npm run gen:entity
```

A test fails if the generated file is older than the installed package. The official schemas are not perfect (some fields are typed loosely or slightly wrong); use `component()` when one gets in the way.

## 日本語

カスタムエンティティを TypeScript で定義します。ビルド時に `behaviorPacker` が定義を読み込み、ビヘイビアパックのエンティティ JSON・リソースパックのクライアント側のエンティティ・ローカライズのファイルを作ります。スクリプトからも同じクラスを使うので、プロパティやイベントの名前がずれることがありません。

### 例

```ts
// src/entities/morgrave.ts
import {
  BoolProperty, ComponentGroup, EntityEvent, EnumProperty, entity, health, movement, set, timer, type Component,
} from 'hakomc/entity';

class IsAngry extends BoolProperty('is_angry', false, { client: true }) {}
class Phase extends EnumProperty('phase', ['idle', 'bite', 'roar'], 'idle', { client: true }) {}

// Angry と Calm はお互いを参照する。循環するところは型（Component[]）を書く
class Angry extends ComponentGroup {
  components: Component[] = [movement({ value: 0.35 }), timer({ time: 30, time_down_event: Calm })];
}
class Enrage extends EntityEvent {
  static readonly id = 'enrage';
  add = [Angry];
  set = [set(IsAngry, true), set(Phase, 'roar')];
}
class Calm extends EntityEvent {
  static readonly id = 'calm';
  remove = [Angry];
  set = [set(IsAngry, false), set(Phase, 'idle')];
}

export class Morgrave extends entity('hako:morgrave', {
  name: { en_US: 'Morgrave', ja_JP: 'モルグレイヴ' },
  properties: [IsAngry, Phase],
  components: [health({ value: 600, max: 600 })],
  events: [Enrage],
  client: { geometry: 'geometry.morgrave', textures: 'textures/entity/morgrave' },
}) {
  enrage() {
    if (!this.get(IsAngry)) this.trigger(Enrage);
  }
}
```

```ts
// src/pack.ts — ビルド時に behaviorPacker が読み込む
import { definePack } from 'hakomc/entity';
import { Morgrave } from './entities/morgrave';
export default definePack({ entities: [Morgrave] });
```

```ts
// src/index.ts — スクリプト
import { world } from '@minecraft/server';
import { Morgrave } from './entities/morgrave';

world.afterEvents.entityHurt.subscribe(({ hurtEntity }) => {
  if (Morgrave.is(hurtEntity)) Morgrave.of(hurtEntity).enrage();
});
```

画像・音・モデルは `assets/` に置きます（[Vite Plugin](vite-plugin.md) を参照）。

### 部品

| | 書き方 | JSON での名前 |
| --- | --- | --- |
| プロパティ | `class X extends BoolProperty(id, 既定値, { client })`。ほかに `IntProperty` / `FloatProperty`（`range`）、`EnumProperty(id, 値の一覧, 既定値)` | `<名前空間>:<id>`。`id` は必須（変えるとワールドに保存された値が失われるため） |
| コンポーネント | `health({ ... })`・`behaviorMeleeAttack({ ... })` など、`minecraft:` の全コンポーネント。名前はコンポーネント名から `minecraft:` を取って camelCase にしたもの。項目は公式と同じ | そのまま |
| グループ | `class X extends ComponentGroup { components = [...] }` | `static id`、無ければクラス名を snake_case にしたもの |
| イベント | `class X extends EntityEvent { static readonly id = '…'; add; remove; set; trigger; extra }` | `<名前空間>:<id>`。`id` は必須（`/event entity` で使う名前） |
| エンティティ | `entity(id, { name, properties, components, events, groups, client, … })` | |

`events` から辿れるグループとイベント（`add`・`remove`・`trigger`、`timer` などのコンポーネントのイベントの項目）は、お互いを参照していても自動で集めます。

コンポーネントの中でイベントを指す項目（`time_down_event`、`on_damage` の `event` など）には、文字列の代わりにイベントのクラスを渡せます。`minecraft:entity_spawned` のような組み込みのイベントは文字列のままです。

型がまだ無いコンポーネントは `component('minecraft:new_thing', { ... })` で書けます。イベントの JSON で専用の項目がまだ無いもの（`sequence`・`randomize`・`queue_command` など）は `extra` に書きます。

### 型チェックで見つかる間違い

- エンティティが持たないプロパティの読み書き、`events` に無いイベントの `trigger`
- 型の違う値（`set(IsAngry, 'yes')`）、enum に無い値、enum の既定値が `values` に無い
- コンポーネントの項目名の打ち間違い（`health({ valu: 1 })`）や値の型の違い
- イベントを入れる所へのグループ、`static readonly id` の無いイベント

### ビルド時に見つかる間違い

識別子の形、名前の重なり（プロパティ・イベント・グループ・エンティティ）、`range` / `values` の外の既定値、同じコンポーネントを 2 回書いたもの。ビルドが止まり、理由が表示されます。

### スクリプト側

| メンバー | |
| --- | --- |
| `Morgrave.is(entity)` | `typeId` が一致するか |
| `Morgrave.of(entity)` | そのエンティティ用の、自分のクラスのオブジェクト |
| `this.entity` | `Entity` |
| `get(P)` / `set(P, 値)` | 型付きの `getProperty` / `setProperty`。書いた値が読めるのは tick の終わり（実機の挙動） |
| `trigger(E)` | `triggerEvent` |
| `Morgrave.propertyName(P)` / `Morgrave.eventName(E)` | JSON での名前（`/event` や molang などで使う） |

オブジェクトは薄い包みなので、必要なときに作ってください。クラスに足したフィールドは**保存されません**。チャンクの読み込み直しや再起動のあとも残したい値は、プロパティにしてください。

### コンポーネントの更新

コンポーネントの型と関数は、[`@minecraft/bedrock-schemas`](https://www.npmjs.com/package/@minecraft/bedrock-schemas)（Mojang、MIT）の JSON スキーマから生成しています。パッケージを上げたら、次を実行してください。

```bash
npm run gen:entity
```

生成したファイルがインストール済みのパッケージより古いと、テストが失敗して知らせます。公式のスキーマも完全ではなく、型が大ざっぱだったり少し違ったりする項目があります。邪魔になるときは `component()` で書いてください。
