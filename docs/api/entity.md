# Entity API (`hakomc/entity`)

[English](#english) | [日本語](#日本語)

`import { entity, BoolProperty, EntityEvent, ComponentGroup, health } from 'hakomc/entity';`

## English

Define custom entities in TypeScript, together with their behaviour. At build time `behaviorPacker` turns the definitions into the behavior pack entity JSON, the resource pack client entity and the localisation files. In the game, the same class receives the events of each entity (`onHurt`, `onTick`…), so property and event names cannot drift apart.

### Example

```ts
// src/entities/morgrave.ts
import type { EntityHurtAfterEvent } from '@minecraft/server';
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
  damage = 0;   // per-entity, not saved (see below)

  onHurt(ev: EntityHurtAfterEvent) {
    this.damage += ev.damage;
    if (this.damage >= 240 && !this.get(IsAngry)) this.trigger(Enrage);
  }
}
Morgrave.register();
```

```ts
// src/index.ts — the script entry
import './entities/morgrave';
```

`register()` does two things: in the game it turns the hooks on, and at build time `behaviorPacker` loads `src/index.ts` (with the simulated `@minecraft/server`) and generates the JSON of every registered entity. To leave an entity out, stop importing it — the JSON and the hooks go together.

Images, sounds and models go in `assets/` (see [Vite Plugin](vite-plugin.md)).

### Hooks

Write only the ones you need. Each one is called on the object of that entity.

| Hook | When |
| --- | --- |
| `onSpawn(ev: EntitySpawnAfterEvent)` | Newly spawned (egg, summon, breeding…) |
| `onLoad()` | Loaded rather than spawned: chunk load, world start, `/reload`. Existing entities are found at start-up |
| `onHurt(ev: EntityHurtAfterEvent)` | It took damage |
| `onHit(ev: EntityHitEntityAfterEvent)` | It hit something (melee) |
| `onInteract(ev: PlayerInteractWithEntityAfterEvent)` | A player used / right-clicked it |
| `onTick()` | Every tick |
| `onDie(ev: EntityDieAfterEvent, last: LastKnown)` | It died. `this.entity` can no longer be read; `last` has the location, dimension and property values from the last tick |
| `onRemove()` | Just before it is removed or unloaded. Still readable, but the world cannot be changed here (before event) |

- One object per entity: `Morgrave.of(entity)` returns the same object the hooks get, so fields are shared. `Morgrave.instances()` lists the loaded ones.
- An exception in one entity's `onTick` does not stop the others (it is logged, then rethrown).
- The hook parameter types are checked against the base class; write them (`ev: EntityHurtAfterEvent`), TypeScript does not infer them for methods.

### Using `src/pack.ts` instead

If `src/index.ts` cannot run in the simulated environment (it calls something not simulated at the top level), put the list in `src/pack.ts`; it is used instead of `src/index.ts` when it exists. Registration for the hooks is still `register()`.

```ts
// src/pack.ts
import { definePack } from 'hakomc/entity';
import { Morgrave } from './entities/morgrave';
export default definePack({ entities: [Morgrave] });
```

When `src/index.ts` fails to load and nothing was registered yet, the build continues with a warning (projects that do not use entities are not affected). If something was registered, the build stops, since the JSON would be incomplete.

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
| `Morgrave.of(entity)` | The object of your class for that entity (the same one the hooks get) |
| `Morgrave.register()` | Turn the hooks on / include the entity in the build |
| `Morgrave.instances()` | Loaded entities of this class |
| `this.entity` | The `Entity` |
| `get(P)` / `set(P, value)` | Typed `getProperty` / `setProperty`. Values set are readable at the end of the tick (game behaviour) |
| `trigger(E)` | `triggerEvent` |
| `Morgrave.propertyName(P)` / `Morgrave.eventName(E)` | The JSON name, for `/event`, molang, etc. |

Fields you add to your class are **not** saved: the object is created again when the entity is loaded again (chunk unload, restart, `/reload`). Use properties for anything that must survive.

### Updating the components

The component types and functions are generated from the JSON schemas in [`@minecraft/bedrock-schemas`](https://www.npmjs.com/package/@minecraft/bedrock-schemas) (Mojang, MIT). After upgrading it:

```bash
npm run gen:entity
```

A test fails if the generated file is older than the installed package. The official schemas are not perfect (some fields are typed loosely or slightly wrong); use `component()` when one gets in the way.

## 日本語

カスタムエンティティを、振る舞いと一緒に TypeScript で定義します。ビルド時に `behaviorPacker` が定義を読み込み、ビヘイビアパックのエンティティ JSON・リソースパックのクライアント側のエンティティ・ローカライズのファイルを作ります。ゲーム内では、同じクラスに個体ごとのイベント（`onHurt`・`onTick` など）が届くので、プロパティやイベントの名前がずれることがありません。

### 例

```ts
// src/entities/morgrave.ts
import type { EntityHurtAfterEvent } from '@minecraft/server';
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
  damage = 0;   // 1 体ごとの値。保存はされない（後述）

  onHurt(ev: EntityHurtAfterEvent) {
    this.damage += ev.damage;
    if (this.damage >= 240 && !this.get(IsAngry)) this.trigger(Enrage);
  }
}
Morgrave.register();
```

```ts
// src/index.ts — スクリプトの入口
import './entities/morgrave';
```

`register()` には 2 つの役割があります。ゲーム内ではフックを有効にし、ビルド時には `behaviorPacker` が `src/index.ts` を（`@minecraft/server` を模擬に差し替えて）読み込んで、登録されたエンティティの JSON を作ります。エンティティを外したいときは、import をやめるだけです。JSON とフックが一緒に外れます。

画像・音・モデルは `assets/` に置きます（[Vite Plugin](vite-plugin.md) を参照）。

### フック

必要なものだけ書いてください。どれも、その個体のオブジェクトで呼ばれます。

| フック | いつ |
| --- | --- |
| `onSpawn(ev: EntitySpawnAfterEvent)` | 新しく出現した（スポーンエッグ・召喚・繁殖など） |
| `onLoad()` | 出現ではなく読み込まれた（チャンクの読み込み、ワールドの起動、`/reload`）。起動時はすでにいる個体を探す |
| `onHurt(ev: EntityHurtAfterEvent)` | ダメージを受けた |
| `onHit(ev: EntityHitEntityAfterEvent)` | 攻撃（近接）を当てた |
| `onInteract(ev: PlayerInteractWithEntityAfterEvent)` | プレイヤーに右クリック（使用）された |
| `onTick()` | 毎 tick |
| `onDie(ev: EntityDieAfterEvent, last: LastKnown)` | 死んだ。`this.entity` はもう読めないので、`last` に直前の tick の位置・ディメンション・プロパティの値を入れて渡す |
| `onRemove()` | 消える・読み込まれなくなる直前。まだ読めるが、世界を変更する操作はできない（before イベントのため） |

- **1 体につき 1 つのオブジェクト:** `Morgrave.of(entity)` は、フックに渡されるのと同じオブジェクトを返すので、フィールドも共有されます。`Morgrave.instances()` で、読み込まれている個体の一覧を得られます。
- **例外:** ある個体の `onTick` で例外が出ても、ほかの個体は止まりません（ログに出してから投げ直します）。
- **引数の型:** フックの引数の型は、基底クラスと照らし合わせて確認されます。ただし、メソッドの引数は TypeScript が推論しないので、`ev: EntityHurtAfterEvent` のように書いてください。

### 代わりに `src/pack.ts` を使う

`src/index.ts` が模擬環境で動かない（模擬していない機能をトップレベルで呼んでいる）場合は、一覧を `src/pack.ts` に書きます。`src/pack.ts` があれば、`src/index.ts` の代わりにそちらを使います。フックを有効にするのは、この場合も `register()` です。

```ts
// src/pack.ts
import { definePack } from 'hakomc/entity';
import { Morgrave } from './entities/morgrave';
export default definePack({ entities: [Morgrave] });
```

`src/index.ts` の読み込みに失敗したとき、まだ何も登録されていなければ、警告を出してビルドを続けます（エンティティを使っていないプロジェクトには影響しません）。何か登録されていた場合は、JSON が欠けてしまうので、ビルドを止めます。

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
| `Morgrave.of(entity)` | そのエンティティ用の、自分のクラスのオブジェクト（フックに渡されるのと同じもの） |
| `Morgrave.register()` | フックを有効にし、ビルドの対象にする |
| `Morgrave.instances()` | 読み込まれている、このクラスの個体 |
| `this.entity` | `Entity` |
| `get(P)` / `set(P, 値)` | 型付きの `getProperty` / `setProperty`。書いた値が読めるのは tick の終わり（実機の挙動） |
| `trigger(E)` | `triggerEvent` |
| `Morgrave.propertyName(P)` / `Morgrave.eventName(E)` | JSON での名前（`/event` や molang などで使う） |

クラスに足したフィールドは**保存されません**。エンティティが読み込まれ直すと（チャンクの読み込み直し、再起動、`/reload`）、オブジェクトは作り直されます。残したい値は、プロパティにしてください。

### コンポーネントの更新

コンポーネントの型と関数は、[`@minecraft/bedrock-schemas`](https://www.npmjs.com/package/@minecraft/bedrock-schemas)（Mojang、MIT）の JSON スキーマから生成しています。パッケージを上げたら、次を実行してください。

```bash
npm run gen:entity
```

生成したファイルがインストール済みのパッケージより古いと、テストが失敗して知らせます。公式のスキーマも完全ではなく、型が大ざっぱだったり少し違ったりする項目があります。邪魔になるときは `component()` で書いてください。
