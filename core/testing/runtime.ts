/**
 * hakomc/testing の共有状態。
 *
 * 模擬 @minecraft/server（server.ts）と、テストから操作する sim（index.ts）は
 * このモジュールを通して同じ世界を見る。
 */

export type Vector3 = { x: number, y: number, z: number };
export type Vector2 = { x: number, y: number };

/** sim.log に残る記録 */
export interface LogEntry {
  kind: string;
  tick: number;
  entityId?: string;
  [key: string]: any;
}

type Handler = (ev: any) => void;

/** subscribe / unsubscribe できるイベント */
export class Signal {
  readonly handlers: Handler[] = [];
  constructor(readonly name: string) {}
  subscribe(handler: Handler): Handler {
    this.handlers.push(handler);
    return handler;
  }
  unsubscribe(handler: Handler): void {
    const i = this.handlers.indexOf(handler);
    if (i >= 0) this.handlers.splice(i, 1);
  }
  /** ハンドラ内の例外は実機と同じくログに出して握りつぶし、他のハンドラは続行する */
  emit(ev: any): void {
    for (const h of [...this.handlers]) {
      try {
        h(ev);
      } catch (e) {
        state.errors.push({ where: this.name, error: e });
      }
    }
  }
}

/**
 * これまでに作られた全ての Signal。
 * signalGroup は Proxy で遅延生成するため Object.keys では列挙できない。購読の一括解除はこの一覧を使う。
 */
const allSignals: Signal[] = [];

/** 全ての Signal から購読を外す（sim.reset({ all: true }) 用） */
export function clearAllSubscriptions(): void {
  for (const s of allSignals) s.handlers.length = 0;
}

/**
 * 存在しない名前のイベントでも subscribe できる入れ物。
 * 実機にあるイベントを模擬側で一つずつ書かなくても、ユーザーコードが落ちないようにする。
 */
export function signalGroup(prefix: string): Record<string, Signal> {
  const signals = new Map<string, Signal>();
  return new Proxy({} as Record<string, Signal>, {
    get(_t, key) {
      if (typeof key !== 'string') return undefined;
      let s = signals.get(key);
      if (!s) {
        s = new Signal(`${prefix}.${key}`);
        signals.set(key, s);
        allSignals.push(s);
      }
      return s;
    },
  });
}

/** エンティティの種類の定義（実機ではビヘイビアパックの entity JSON が持つ情報） */
export interface EntityTypeDef {
  /** 最大体力（既定 20） */
  health?: number;
  /** type_family */
  families?: string[];
  /** エンティティプロパティの初期値。未定義の名前を get/setProperty すると実機同様に例外 */
  properties?: Record<string, boolean | number | string>;
  /** minecraft:rideable の座席位置（ブロック単位、乗り物ローカル） */
  seats?: Vector3[];
  /** 重力・空気抵抗・接地を計算するか */
  physics?: boolean;
  /** 当たり判定の大きさ（接地判定に使う） */
  collision?: { width: number, height: number };
  /** triggerEvent で set_property するイベント（entity JSON の events.*.set_property 相当） */
  events?: Record<string, { setProperty?: Record<string, boolean | number | string> }>;
}

export interface Timer {
  id: number;
  at: number;
  every?: number;
  fn: () => void;
  job?: Generator<unknown, unknown, unknown>;
}

export const state = {
  tick: 0,
  nextId: 1,
  nextTimerId: 1,
  /** id -> entity（world から消えたものは入っていない） */
  entities: new Map<string, any>(),
  timers: new Map<number, Timer>(),
  /** setProperty は実機と同じく tick の終わりにまとめて反映される */
  pendingProperties: [] as Array<[any, string, any]>,
  worldDynamic: new Map<string, any>(),
  types: new Map<string, EntityTypeDef>(),
  blocks: new Map<string, string>(),
  groundY: -Infinity as number,
  difficulty: 'Normal' as string,
  log: [] as LogEntry[],
  errors: [] as Array<{ where: string, error: unknown }>,
};

export const signals = {
  worldAfter: signalGroup('world.afterEvents'),
  worldBefore: signalGroup('world.beforeEvents'),
  systemAfter: signalGroup('system.afterEvents'),
  systemBefore: signalGroup('system.beforeEvents'),
};

export function record(kind: string, data: Record<string, any> = {}): void {
  state.log.push({ kind, tick: state.tick, ...data });
}

export const blockKey = (v: Vector3) => `${Math.floor(v.x)},${Math.floor(v.y)},${Math.floor(v.z)}`;

export function isSolidAt(v: Vector3): boolean {
  const t = state.blocks.get(blockKey(v));
  if (t !== undefined) return t !== 'minecraft:air' && !t.includes('water') && !t.includes('lava');
  return Math.floor(v.y) < state.groundY;
}

/** 実機の「未実装のメンバーに触った」と区別できるエラー */
export function notImplemented(what: string): never {
  throw new Error(`[hakomc/testing] ${what} は模擬環境に未実装です`);
}

/**
 * 実装していないメンバーにアクセスしたとき、undefined ではなく分かりやすい例外を出す。
 * （undefined のまま進むと、テストが別の場所で意味の分からない落ち方をするため）
 */
export function strict<T extends object>(target: T, label: string): T {
  return new Proxy(target, {
    get(t, key, recv) {
      if (typeof key === 'symbol' || key in t) return Reflect.get(t, key, recv);
      if (key === 'then' || key === 'toJSON' || key === 'asymmetricMatch' || key.startsWith('$$') || key.startsWith('@@')) return undefined;
      return notImplemented(`${label}.${String(key)}`);
    },
  });
}
