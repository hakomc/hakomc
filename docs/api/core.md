# Core API (`hakomc`)

[English](#english) | [日本語](#日本語)

`import { ... } from 'hakomc';`

## English

### Timer

#### `repeating`

Runs `run` every `every` ticks, until `cancel()`'d or `max` elapsed ticks is reached.

```ts
import { repeating, debug } from 'hakomc';

const t = repeating({
  every: 20,
  run: (elapsed) => debug(elapsed),
  max: 200,
  final: () => debug('done'),
});
t.stop();
t.resume();
t.cancel();
```

#### `delayed`

Runs `run` once, after `ticks` ticks.

```ts
import { delayed, debug } from 'hakomc';

delayed(100, () => debug('fired'));
```

#### `sleep`

Waits `ticks` ticks.

```ts
import { sleep } from 'hakomc';

await sleep(20); // 1 second (20 ticks)
```

#### `until`

Polls `when` and runs `run` once it returns `true`, or gives up after `timeout` ticks.

```ts
import { until, debug } from 'hakomc';

const u = until({
  when: () => player.isValid(),
  run: () => debug('ready'),
  timeout: 200,
});
u.cancel();
```

#### `waitUntil`

Same as `until`, but resolves a `Promise<boolean>` instead of taking a `run` callback.

```ts
import { waitUntil } from 'hakomc';

const ready = await waitUntil(() => player.isValid(), { timeout: 200 });
```

### Net

Bedrock Dedicated Server only (`@minecraft/server-net`).

```ts
fetch(input: string, init?: {
  method?: string; headers?: HeadersInit; body?: string; timeout?: number;
}): Promise<Response>
```

```ts
import { fetch, Headers } from 'hakomc';

const res = await fetch('https://example.com/api', {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  body: '{}',
});

res.status;                          // number
res.ok;                              // boolean
res.headers.get('content-type');
res.text();                          // string (not a Promise)
res.json();                          // parsed body (not a Promise)
```

### Debug

```ts
debug(...args: any[]): void
```

`console.log` replacement that also shows the file/line it was called from.

---

## 日本語

### Timer

#### `repeating`

`every`tickごとに`run`を実行し続ける。`cancel()`されるか、経過tickが`max`に達すると止まる。

```ts
import { repeating, debug } from 'hakomc';

const t = repeating({
  every: 20,
  run: (elapsed) => debug(elapsed),
  max: 200,
  final: () => debug('done'),
});
t.stop();
t.resume();
t.cancel();
```

#### `delayed`

`ticks`tick後に`run`を1回だけ実行する。

```ts
import { delayed, debug } from 'hakomc';

delayed(100, () => debug('fired'));
```

#### `sleep`

`ticks`tickだけ待機する。

```ts
import { sleep } from 'hakomc';

await sleep(20); // 1秒(20tick)
```

#### `until`

`when`をポーリングし、`true`になったら`run`を実行する。`timeout`tickに達すると諦める。

```ts
import { until, debug } from 'hakomc';

const u = until({
  when: () => player.isValid(),
  run: () => debug('ready'),
  timeout: 200,
});
u.cancel();
```

#### `waitUntil`

`until`と同様だが、`run`コールバックの代わりに`Promise<boolean>`をresolveする。

```ts
import { waitUntil } from 'hakomc';

const ready = await waitUntil(() => player.isValid(), { timeout: 200 });
```

### Net

Bedrock Dedicated Server専用(`@minecraft/server-net`)。

```ts
fetch(input: string, init?: {
  method?: string; headers?: HeadersInit; body?: string; timeout?: number;
}): Promise<Response>
```

```ts
import { fetch, Headers } from 'hakomc';

const res = await fetch('https://example.com/api', {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  body: '{}',
});

res.status;                          // number
res.ok;                              // boolean
res.headers.get('content-type');
res.text();                          // string(Promiseではない)
res.json();                          // パース済みボディ(Promiseではない)
```

### Debug

```ts
debug(...args: any[]): void
```

`console.log`の代替。呼び出し元のファイル・行も表示する。
