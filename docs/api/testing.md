# Testing API (`hakomc/testing`)

[English](#english) | [日本語](#日本語)

`import { sim } from 'hakomc/testing';`

## English

A simulated `@minecraft/server` for unit tests (Vitest). Your add-on code runs unchanged; `sim` drives the world tick by tick and records what happened.

### Setup

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { mockMinecraftServer } from 'hakomc/vite-plugin';

export default defineConfig({ plugins: [mockMinecraftServer()] });
```

The plugin replaces `@minecraft/server`, `@minecraft/server-ui` and `@minecraft/server-net` (type-only packages with no runnable JS). Every enum, constant and class name exists, so imports never fail; members that are not simulated throw a clear `[hakomc/testing] ... is not implemented` error instead of returning `undefined`.

### Example

```ts
import { beforeEach, expect, it } from 'vitest';
import { EntityDamageCause } from '@minecraft/server';
import { sim } from 'hakomc/testing';
import '../src/boss';   // registers its subscriptions / runInterval once

beforeEach(() => {
  sim.reset();
  sim.defineEntityType('demo:boss', { health: 600, properties: { 'demo:rage': false } });
});

it('enrages after 240 damage', () => {
  const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 30 });
  const boss = sim.spawn('demo:boss', { x: 0, y: 0, z: 0 });
  boss.applyDamage(240, { cause: EntityDamageCause.entityAttack, damagingEntity: p });
  sim.tick();
  expect(boss.getProperty('demo:rage')).toBe(true);
});
```

### Game behaviour that is reproduced on purpose

| Behaviour | Why it matters |
| --- | --- |
| `setProperty` values become readable only at the end of the tick | Reading back right after writing returns the old value |
| Removed / killed entities are invalid; most members throw | `entityDie`'s `deadEntity` can no longer be read |
| `remove()` fires `beforeEvents.entityRemove` (still readable) then `afterEvents.entityRemove` | |
| Players stay valid after death (`sim.respawn` fires `playerSpawn`) | |
| Mob attack damage to players scales with difficulty; Peaceful = 0 | |
| Creative / Spectator players take no damage | |
| `world.beforeEvents.entityHurt` can cancel or change damage | |
| Riders sit on seats rotated by the vehicle's body yaw | Multi-part hitboxes |
| `applyImpulse` on a player throws | |
| Errors thrown in timers / event handlers are rethrown from `sim.tick()` | Bugs fail the test instead of disappearing |

### `sim`

| Member | Description |
| --- | --- |
| `tick(n)` / `tickAsync(n)` / `tickUntil(pred, max)` | Advance time. Order per tick: physics → timers → property flush. Use `tickAsync` for code that `await`s (`sleep`, `waitTicks`) |
| `reset({ all })` | Clear entities and logs, tick back to 0. Subscriptions and `runInterval`s registered by your modules stay unless `all: true` |
| `defineEntityType(id, def)` / `loadEntityJson(json)` | Register health, families, properties, seats, physics, `set_property` events — by hand or from a behavior-pack entity JSON |
| `spawn(id, loc)` / `spawnPlayer(name, loc, { gameMode })` | Returns the real `Entity` / `Player` types |
| `respawn(player)` / `hurt(target, amount, opts)` | `hurt` simulates a vanilla hit: fires `entityHitEntity` (melee with `damagingEntity`) and goes through `beforeEvents.entityHurt` even with 0 damage |
| `scriptEvent(id, msg, { sourceEntity })` / `entityEvent(entity, name)` / `emit(path, payload)` | Fire `/scriptevent`, `/event entity`, or any signal |
| `setGround(y)` / `setBlock(loc, id)` / `setDifficulty(d)` | World setup |
| `logs(kind, where)` / `log` / `errors` | Recorded camera, input, action bar, sounds, particles, commands, animations, damage, landings… |
| `internals(entity)` | Test-only access, e.g. `headYawOffset` to make the head face elsewhere than the body |

### Updating the stubs

The names come from the installed type packages. After upgrading `@minecraft/server` (or `-ui` / `-net`) run:

```bash
npm run gen:testing
```

A test fails if the stubs are older than the installed `@minecraft/server`.

## 日本語

ユニットテスト（Vitest）用の、`@minecraft/server` の模擬環境です。アドオンのコードは書き換えずにそのまま動き、`sim` で世界を 1 tick ずつ進めて、起きたことを記録から確かめられます。

### 設定

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { mockMinecraftServer } from 'hakomc/vite-plugin';

export default defineConfig({ plugins: [mockMinecraftServer()] });
```

このプラグインは `@minecraft/server`・`@minecraft/server-ui`・`@minecraft/server-net`（実行用の JS を持たない型定義だけのパッケージ）を差し替えます。enum・定数・クラス名は全てそろっているので、import で落ちることはありません。模擬していないメンバーに触れると、`undefined` を返すのではなく `[hakomc/testing] ... は模擬環境に未実装です` という例外になります。

### 例

```ts
import { beforeEach, expect, it } from 'vitest';
import { EntityDamageCause } from '@minecraft/server';
import { sim } from 'hakomc/testing';
import '../src/boss';   // イベント購読や runInterval はここで 1 回だけ登録される

beforeEach(() => {
  sim.reset();
  sim.defineEntityType('demo:boss', { health: 600, properties: { 'demo:rage': false } });
});

it('240 ダメージで怒る', () => {
  const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 30 });
  const boss = sim.spawn('demo:boss', { x: 0, y: 0, z: 0 });
  boss.applyDamage(240, { cause: EntityDamageCause.entityAttack, damagingEntity: p });
  sim.tick();
  expect(boss.getProperty('demo:rage')).toBe(true);
});
```

### わざと再現している実機の挙動

| 挙動 | 何に効くか |
| --- | --- |
| `setProperty` の値は tick の終わりまで読めない | 書いた直後に読み直すと古い値が返る |
| remove / 死亡したエンティティは無効になり、ほとんどのメンバーが例外を投げる | `entityDie` の `deadEntity` からはもうデータを読めない |
| `remove()` では `beforeEvents.entityRemove`（まだ読める）→ `afterEvents.entityRemove` の順に来る | |
| プレイヤーは死んでも有効なまま（`sim.respawn` で `playerSpawn` が発火） | |
| モブからプレイヤーへの攻撃は難易度で増減し、ピースフルでは 0 | |
| クリエイティブ / スペクテイターのプレイヤーはダメージを受けない | |
| `world.beforeEvents.entityHurt` でダメージを取り消し・変更できる | |
| 座席の乗客は、乗り物の体の向きで回した位置に乗る | 複数部位の当たり判定 |
| プレイヤーへの `applyImpulse` は例外 | |
| タイマーやイベントハンドラ内の例外は `sim.tick()` から投げ直される | バグが消えずにテストの失敗として出る |

### `sim`

| メンバー | 内容 |
| --- | --- |
| `tick(n)` / `tickAsync(n)` / `tickUntil(pred, max)` | 時間を進める。1 tick の順番は 物理 → タイマー → プロパティの反映。`await` を含むコード（`sleep`・`waitTicks`）は `tickAsync` で進める |
| `reset({ all })` | エンティティと記録を消して tick を 0 に戻す。モジュールが登録した購読や `runInterval` は、`all: true` でなければ残る |
| `defineEntityType(id, def)` / `loadEntityJson(json)` | 体力・ファミリー・プロパティ・座席・物理・`set_property` イベントを登録する。手で書くか、ビヘイビアパックの entity JSON から読み込む |
| `spawn(id, loc)` / `spawnPlayer(name, loc, { gameMode })` | 本物の `Entity` / `Player` の型を返す |
| `respawn(player)` / `hurt(target, amount, opts)` | `hurt` はバニラの攻撃の再現。`damagingEntity` 付きの近接攻撃なら `entityHitEntity` も発火し、0 ダメージでも `beforeEvents.entityHurt` を通る |
| `scriptEvent(id, msg, { sourceEntity })` / `entityEvent(entity, name)` / `emit(path, payload)` | `/scriptevent`・`/event entity`・任意のイベントを発火する |
| `setGround(y)` / `setBlock(loc, id)` / `setDifficulty(d)` | 世界の準備 |
| `logs(kind, where)` / `log` / `errors` | カメラ・入力制限・アクションバー・音・パーティクル・コマンド・アニメーション・ダメージ・着地などの記録 |
| `internals(entity)` | テスト専用の内部操作。例: `headYawOffset` で頭だけ体と別の方向を向かせる |

### スタブの更新

import できる名前は、インストールされている型定義パッケージから生成しています。`@minecraft/server`（または `-ui` / `-net`）を上げたら、次を実行してください。

```bash
npm run gen:testing
```

スタブがインストール済みの `@minecraft/server` より古いと、テストが失敗して知らせます。
