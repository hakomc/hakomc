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
| `onLoad(reason)` | Loaded rather than spawned. `reason`: `'chunk'` (chunk load), `'startup'` (already there at world start / `/reload`), `'late'` (first seen through another event or `of()` before any load notice) |
| `onHurt(ev: EntityHurtAfterEvent)` | It took damage |
| `onHit(ev: EntityHitEntityAfterEvent)` | It hit something (melee) |
| `onInteract(ev: PlayerInteractWithEntityAfterEvent)` | A player used / right-clicked it |
| `onTick()` | Every tick |
| `onDie(ev: EntityDieAfterEvent, last: LastKnown)` | It died. `this.entity` can no longer be read (`getProperty` etc. throw); `last` has the location, dimension id and property values from the last tick. For drops or effects use `last.location` with `world.getDimension(last.dimensionId)` |
| `onRemove()` | Just before it is removed or unloaded (also after death). `this.entity` is still readable, but this runs inside a before event: changing the world (spawning, `setProperty`, `triggerEvent`, commands…) throws. Use `system.run(() => …)` to do it next tick — the entity is gone by then |

- One object per entity: `Morgrave.of(entity)` returns the same object the hooks get, so fields are shared. `Morgrave.instances()` lists the loaded ones.
- An exception in one entity's `onTick` does not stop the others (it is logged, then rethrown).
- The hook parameter types are checked against the base class; write them (`ev: EntityHurtAfterEvent`), TypeScript does not infer them for methods.

### Timelines

Steps that span ticks — wind up, attack, recover — are written as generators. The framework advances them every tick (the class must be `register()`ed).

```ts
class Boar extends entity('demo:boar', { … }) {
  charge = this.timeline(this.chargeSteps, { lane: 'attack' });

  *chargeSteps(t: Steps, target: Player) {
    try {
      this.set(Phase, 'windup');
      const goal = target.location;                 // remember where the player was
      yield* t.wait(20);                            // 20 ticks
      this.set(Phase, 'dash');
      const hit = yield* t.until(() => this.stepTowards(goal), 40);   // true when reached, false after 40 ticks
      if (hit) target.applyDamage(6, { cause: EntityDamageCause.entityAttack, damagingEntity: this.entity });
      this.set(Phase, 'recover');
      yield* t.wait(30);
    } finally {
      if (this.entity.isValid) this.set(Phase, 'idle');   // also runs when cancelled
    }
  }

  onTick() {
    const p = this.nearestPlayer();
    if (p && !this.busy('attack')) this.charge.start(p);
  }
}
```

| | |
| --- | --- |
| `this.timeline(steps, { lane, onCancel })` | Create one (as a field). Pass a generator method; or write it inline with a field type: `charge: Timeline<[Player]> = this.timeline(function* (t, target) { … })` — without the type, TypeScript reports a circular reference |
| `yield* t.wait(n)` / `yield* t.until(pred, max?)` | Wait n ticks / until `pred()` is true (checked every tick); `until` returns `false` when `max` ticks pass |
| `t.elapsed` | Ticks since `start()` |
| `start(...args)` | Runs up to the first `yield*` immediately. Returns `false` (and does nothing) if it is running or another timeline of the same `lane` is |
| `interrupt(...args)` | Cancel what runs in the same lane (reason `'interrupted'`), then start |
| `cancel()` / `running` / `lastCancelReason` | Reasons: `'cancel'`, `'interrupted'`, `'died'`, `'removed'`, `'error'` |
| `this.busy(lane?)` / `this.cancelTimelines()` | Any timeline (of a lane) running / cancel all |

- Cancelling runs the generator's `finally` and `onCancel`. Death cancels before `onDie`; removal cancels on the next tick, outside the before event, so cleanup can change the world. After death or removal the entity itself can no longer be used — check `this.entity.isValid`.
- An exception stops only that timeline (reason `'error'`); other entities keep going.
- Why generators instead of `async`/`await`: they run synchronously inside the tick, so the timing is exact and they can be stopped at any point. An `await` continues after the promise settles, which makes the tick it runs on hard to control (and tests would need `sim.tickAsync`).

### Parts (hitboxes)

Extra hitboxes are invisible entities riding seats of the body, so they follow its position and rotation on every client.

```ts
/** weak point on the back: ×2.5, breaks after 40 damage */
class Back extends Part('back', { seat: [0, 2.2, -0.6], size: [1, 1], damageMultiplier: 2.5, health: 40 }) {}
class LeftArm extends Part('left_arm', { seat: [1.2, 1.2, 0], size: [0.8, 1.4], damageMultiplier: 0.5 }) {}

class Golem extends entity('demo:golem', { parts: [Back, LeftArm], … }) {
  onPartBreak(part: PartClass) {
    if (part === Back) this.trigger(Stagger);
  }
}
Golem.register();
```

| `Part(id, options)` | |
| --- | --- |
| `seat` | `[x, y, z]` in blocks from the body, rotated with it |
| `size` | `[width, height]` of the hitbox |
| `damageMultiplier` | Damage passed to the body (default 1) |
| `health` | The part breaks after this much damage (counted before the multiplier). Without it the part never breaks |
| `causes` | Causes passed to the body (default `entityAttack`, `projectile`), so fire or an explosion does not hit the body once per part |

- Generated: an entity per part (`demo:golem_back`) with a client entity that draws nothing (an empty model), and the body's `minecraft:rideable` (do not write your own).
- Damage to a part goes to the body, multiplied; the part itself never loses health. Damage from the body itself or its other parts is ignored.
- A broken part **stays on its seat** with a tiny hitbox and is ignored. Seats are assigned by riding order, so taking a part off would shift every later part to the wrong seat.
- Part health and the broken state are saved on the body (dynamic property) and survive reloads. When the body is loaded, parts are put back on their seats in order; a missing one is spawned again.
- The body dying removes its parts. A part without its body is removed after two checks (every 40 ticks).
- `this.part(Back)`: `entity`, `health`, `maxHealth`, `broken`, `break()`, `restore()`. Hooks: `onPartHurt(part, damage, ev)`, `onPartBreak(part)`, `onPartRestore(part)`.
- In tests, `sim.loadEntityClass(Golem)` loads the body and the parts.

### Grabbing a player

`this.grab(player, options)` holds a player in front of the entity (teleported every tick, following its rotation), and can set the camera and lock inputs. Use it inside a timeline and release in `finally`, so a cancelled timeline always lets go.

```ts
*biteSteps(t: Steps, target: Player) {
  const hold = this.grab(target, { offset: [0, 0.8, 0.9], camera: CameraPreset.ThirdPerson });
  try {
    for (let i = 0; i < 3 && hold.active; i++) {
      yield* t.wait(20);
      target.applyDamage(3, { cause: EntityDamageCause.entityAttack, damagingEntity: this.entity });
    }
  } finally {
    hold.release();
  }
}
```

| Option | |
| --- | --- |
| `offset` | `[x, y, z]` from the holder, rotated with it (default `[0, 0, 1.5]`, in front) |
| `camera` | Camera preset while held: `CameraPreset.ThirdPerson` etc. (the vanilla presets, same values as `MinecraftCameraPresetsTypes` in `@minecraft/vanilla-data`), or the id of your own preset; `{ preset, options }` for options. Left alone if omitted |
| `lock` | Inputs to disable: `'movement'`, `'lateral'`, `'jump'`, `'sneak'`, `'camera'` (default movement and jump) |
| `face` | Turn the player to the holder's head (default true) |
| `max` | Let go after this many ticks |
| `onRelease(reason)` | Called once when released |

The hold is released automatically — camera and inputs restored — when the holder dies (`'holderDied'`) or disappears (`'holderGone'`), the player dies (`'targetDied'`) or leaves (`'targetLeft'`), `max` passes (`'timeout'`), or another grab takes the same player (`'replaced'`). `hold`: `active`, `reason`, `elapsed`, `release()`; `holdOf(player)` returns the current hold.

The player carries a mark (dynamic property) while held. When something could not be restored — the player left, the server stopped, `/reload` — it is restored the next time the player spawns.

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
| `onLoad(reason)` | 出現ではなく読み込まれた。`reason` は `'chunk'`（チャンクの読み込み）、`'startup'`（ワールドの起動・`/reload` のときにすでにいた）、`'late'`（読み込みの通知より先に、別のイベントや `of()` で初めて見つかった） |
| `onHurt(ev: EntityHurtAfterEvent)` | ダメージを受けた |
| `onHit(ev: EntityHitEntityAfterEvent)` | 攻撃（近接）を当てた |
| `onInteract(ev: PlayerInteractWithEntityAfterEvent)` | プレイヤーに右クリック（使用）された |
| `onTick()` | 毎 tick |
| `onDie(ev: EntityDieAfterEvent, last: LastKnown)` | 死んだ。`this.entity` はもう読めない（`getProperty` などは例外になる）ので、`last` に直前の tick の位置・ディメンションの id・プロパティの値を入れて渡す。ドロップや演出には `last.location` と `world.getDimension(last.dimensionId)` を使う |
| `onRemove()` | 消える・読み込まれなくなる直前（死亡後に消えるときも呼ばれる）。`this.entity` はまだ読めるが、before イベントの中なので、世界を変更する操作（スポーン・`setProperty`・`triggerEvent`・コマンドなど）は例外になる。変更したいときは `system.run(() => …)` で次の tick に回す（その時点でエンティティはもう無い） |

- **1 体につき 1 つのオブジェクト:** `Morgrave.of(entity)` は、フックに渡されるのと同じオブジェクトを返すので、フィールドも共有されます。`Morgrave.instances()` で、読み込まれている個体の一覧を得られます。
- **例外:** ある個体の `onTick` で例外が出ても、ほかの個体は止まりません（ログに出してから投げ直します）。
- **引数の型:** フックの引数の型は、基底クラスと照らし合わせて確認されます。ただし、メソッドの引数は TypeScript が推論しないので、`ev: EntityHurtAfterEvent` のように書いてください。

### timeline（段取り）

「構え → 攻撃 → 硬直」のような、何 tick にもわたる段取りは、ジェネレーターで書きます。毎 tick 進めるのはフレームワークです（クラスを `register()` しておく必要があります）。

```ts
class Boar extends entity('demo:boar', { … }) {
  charge = this.timeline(this.chargeSteps, { lane: 'attack' });

  *chargeSteps(t: Steps, target: Player) {
    try {
      this.set(Phase, 'windup');
      const goal = target.location;                 // 構えた瞬間のプレイヤーの位置を覚える
      yield* t.wait(20);                            // 20 tick 待つ
      this.set(Phase, 'dash');
      const hit = yield* t.until(() => this.stepTowards(goal), 40);   // 着いたら true、40 tick 過ぎたら false
      if (hit) target.applyDamage(6, { cause: EntityDamageCause.entityAttack, damagingEntity: this.entity });
      this.set(Phase, 'recover');
      yield* t.wait(30);
    } finally {
      if (this.entity.isValid) this.set(Phase, 'idle');   // 止められたときも動く
    }
  }

  onTick() {
    const p = this.nearestPlayer();
    if (p && !this.busy('attack')) this.charge.start(p);
  }
}
```

| | |
| --- | --- |
| `this.timeline(steps, { lane, onCancel })` | 作る（フィールドで）。ジェネレーターのメソッドを渡す。その場で書くときは、フィールドに型を書く: `charge: Timeline<[Player]> = this.timeline(function* (t, target) { … })`（型が無いと、TypeScript が循環参照のエラーを出す） |
| `yield* t.wait(n)` / `yield* t.until(pred, max?)` | n tick 待つ / `pred()` が true になるまで（毎 tick 確かめて）待つ。`until` は `max` tick 過ぎると `false` を返す |
| `t.elapsed` | `start()` してからの tick 数 |
| `start(...args)` | その場で最初の `yield*` まで進む。動いている、または同じ `lane` の別の段取りが動いているなら、何もせず `false` |
| `interrupt(...args)` | 同じ lane で動いているものを止めて（理由 `'interrupted'`）、始める |
| `cancel()` / `running` / `lastCancelReason` | 止まった理由は `'cancel'`・`'interrupted'`・`'died'`・`'removed'`・`'error'` |
| `this.busy(lane?)` / `this.cancelTimelines()` | （その lane の）段取りが動いているか / 全部止める |

- **止めたとき:** ジェネレーターの `finally` と `onCancel` が動きます。死亡したときは `onDie` の前に止めます。削除のときは、次の tick に before イベントの外で止めるので、後片付けで世界を変更できます。ただし、死亡・削除のあとはエンティティ自体はもう使えないので、`this.entity.isValid` を確かめてください。
- **例外:** 段取りの中で例外が出ても、止まるのはその段取りだけです（理由 `'error'`）。ほかの個体はそのまま進みます。
- **ジェネレーターを使う理由:** `async` / `await` ではなくジェネレーターにしたのは、tick の中で同期的に進むので、どの tick で動くかが正確で、どこでも止められるからです。`await` の続きは Promise の解決後に動くので、どの tick で動くかを制御しにくく、テストにも `sim.tickAsync` が必要になります。

### 部位（当たり判定）

本体とは別の当たり判定は、本体の座席に乗せた見えないエンティティで作ります。座席に乗っているので、どのクライアントでも本体の位置と向きについてきます。

```ts
/** 背中の弱点: 2.5 倍、40 ダメージで壊れる */
class Back extends Part('back', { seat: [0, 2.2, -0.6], size: [1, 1], damageMultiplier: 2.5, health: 40 }) {}
class LeftArm extends Part('left_arm', { seat: [1.2, 1.2, 0], size: [0.8, 1.4], damageMultiplier: 0.5 }) {}

class Golem extends entity('demo:golem', { parts: [Back, LeftArm], … }) {
  onPartBreak(part: PartClass) {
    if (part === Back) this.trigger(Stagger);
  }
}
Golem.register();
```

| `Part(id, options)` | |
| --- | --- |
| `seat` | 本体から見た `[x, y, z]`（ブロック単位）。本体の向きに合わせて回る |
| `size` | 当たり判定の `[幅, 高さ]` |
| `damageMultiplier` | 本体に伝えるダメージの倍率（既定 1） |
| `health` | この分のダメージで部位が壊れる（倍率を掛ける前の値で減る）。書かなければ壊れない |
| `causes` | 本体に伝えるダメージの原因（既定 `entityAttack`・`projectile`）。炎や爆発で、部位の数だけ本体が減らないように |

- **作られるもの:** 部位ごとのエンティティ（`demo:golem_back`）と、何も描かないクライアント側の定義（空のモデル）、本体の `minecraft:rideable` を作ります。`minecraft:rideable` は自分で書かないでください。
- **ダメージの伝わり方:**
  - 部位へのダメージは、倍率を掛けて本体に伝えます。部位自体の体力は減りません。
  - 本体自身や、同じ本体のほかの部位からのダメージは無視します。
- **壊れた部位は座席に乗ったまま:** 当たり判定を小さくし、以後のダメージを無視します。座席は乗った順番で決まるので、降ろすと、後ろの部位が 1 つずつずれて違う座席に来てしまうためです。
- **保存と読み込み直し:**
  - 部位の体力と壊れた状態は、本体（ダイナミックプロパティ）に保存されるので、読み込み直しても残ります。
  - 本体が読み込まれたら、部位を順番通りに座席に乗せ直します。足りない部位は出し直します。
- **消えるとき:** 本体が死ぬと、部位も消えます。本体のいない部位は、40 tick ごとの見回りで 2 回続けて見つかったら消します。
- **スクリプトからの操作:**
  - `this.part(Back)` で `entity`・`health`・`maxHealth`・`broken`・`break()`・`restore()` が使えます。
  - フックは `onPartHurt(part, damage, ev)`・`onPartBreak(part)`・`onPartRestore(part)` です。
- **テスト:** `sim.loadEntityClass(Golem)` で、本体と部位の JSON をまとめて読み込めます。

### プレイヤーを掴む

`this.grab(player, options)` で、プレイヤーをエンティティの前などに固定します（毎 tick テレポートし、向きにも追従します）。カメラの切り替えや、操作の制限もできます。timeline の中で使い、`finally` で放してください。そうすれば、段取りが止められても必ず放せます。

```ts
*biteSteps(t: Steps, target: Player) {
  const hold = this.grab(target, { offset: [0, 0.8, 0.9], camera: CameraPreset.ThirdPerson });
  try {
    for (let i = 0; i < 3 && hold.active; i++) {
      yield* t.wait(20);
      target.applyDamage(3, { cause: EntityDamageCause.entityAttack, damagingEntity: this.entity });
    }
  } finally {
    hold.release();
  }
}
```

| オプション | |
| --- | --- |
| `offset` | 掴んでいる側から見た `[x, y, z]`。向きに合わせて回る（既定 `[0, 0, 1.5]` = 正面） |
| `camera` | 掴んでいる間のカメラ。`CameraPreset.ThirdPerson` など（バニラのプリセット。`@minecraft/vanilla-data` の `MinecraftCameraPresetsTypes` と同じ値）か、自作のプリセットの識別子。オプション付きは `{ preset, options }`。省略すると変えない |
| `lock` | 止める操作: `'movement'`・`'lateral'`・`'jump'`・`'sneak'`・`'camera'`（既定は移動とジャンプ） |
| `face` | プレイヤーを掴んでいる側の頭に向かせる（既定 true） |
| `max` | この tick 数を過ぎたら放す |
| `onRelease(reason)` | 放したときに 1 回呼ばれる |

**自動で放す場面:** 次のときは自動で放し、カメラと操作も元に戻します。
- 掴んでいる側が死んだ（`'holderDied'`）・消えた（`'holderGone'`）
- プレイヤーが死んだ（`'targetDied'`）・抜けた（`'targetLeft'`）
- `max` を過ぎた（`'timeout'`）
- 同じプレイヤーを別の掴みで掴んだ（`'replaced'`）

**`hold` で使えるもの:** `active`・`reason`・`elapsed`・`release()` です。`holdOf(player)` で、今の掴みを得られます。

**戻し損ねたとき:** 掴んでいる間、プレイヤーには印（ダイナミックプロパティ）を付けています。抜けた・サーバーが止まった・`/reload` などで戻せなかったときは、そのプレイヤーが次に出現したときに戻します。

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
