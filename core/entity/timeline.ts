/**
 * timeline: 「構え → 攻撃 → 硬直」のような、tick 単位の段取りを書く仕組み。
 *
 * ```ts
 * class Boar extends entity('demo:boar', { … }) {
 *   charge = this.timeline(function* (this: Boar, t) {
 *     this.set(Phase, 'windup');
 *     yield* t.wait(20);                                  // 20 tick 構える
 *     this.set(Phase, 'dash');
 *     const hit = yield* t.until(() => this.touching(), 40);  // 当たるか 40 tick まで
 *     this.set(Phase, hit ? 'stun' : 'recover');
 *     yield* t.wait(30);
 *   }, { lane: 'action' });
 * }
 * ```
 *
 * async / await ではなくジェネレーター（function* と yield*）で書くのは、tick の処理の中で同期的に進めて止められるから。
 * await の続きは Promise の解決後に動くので、どの tick で動くかがずれやすく、途中で止めるのも難しい。
 *
 * - start() した tick のうちに、最初の yield* まで進む
 * - 止めると（cancel・死亡・削除）、ジェネレーターの finally が動く。後片付けは try / finally に書く
 * - lane が同じ timeline は同時に 1 つだけ動く（攻撃どうしが重ならないように）
 */

/** 段取りの中で使う道具 */
export interface Steps {
  /** n tick 待つ（0 以下なら待たない） */
  wait(ticks: number): Generator<WaitRequest, void, unknown>;
  /**
   * 条件が成り立つまで、毎 tick 確かめながら待つ。
   * @param max 最大で待つ tick 数（省略すると無制限）
   * @returns 成り立ったら true、max を過ぎたら false
   */
  until(pred: () => boolean, max?: number): Generator<WaitRequest, boolean, unknown>;
  /** start() してからの tick 数 */
  readonly elapsed: number;
}

/** 止まった理由 */
export type CancelReason = 'cancel' | 'interrupted' | 'died' | 'removed' | 'error';

/**
 * yield で渡す待ち方。ふつうは t.wait / t.until 経由で使い、自分で作る必要はない。
 * - `{ ticks }`: その tick 数だけ待つ
 * - `{ until, deadline }`: until() が true になるまで毎 tick 確かめる。deadline（Clock の時刻）を過ぎたら諦める
 *
 * 待ちが終わると、ジェネレーターには until なら true / false、ticks なら undefined が渡される。
 */
export type WaitRequest = { ticks: number } | { until: () => boolean, deadline?: number };

export interface TimelineOptions {
  /** 同じ lane の timeline は同時に 1 つだけ動く */
  lane?: string;
  /** 止まったときに呼ぶ（理由付き）。後片付けは finally でもよい */
  onCancel?: (reason: CancelReason) => void;
}

/** 時間の進み方（実行時は system.currentTick、テストでは差し替えられる） */
export interface Clock {
  now(): number;
}

/** 1 つの段取り */
export class Timeline<A extends unknown[] = []> {
  private gen?: Generator<WaitRequest, unknown, unknown>;
  private waiting?: WaitRequest;
  private startedTick = -1;
  private resumeAt = 0;
  private reason?: CancelReason;

  /**
   * @param owner 同じ lane のものを探す一覧と、時計
   * @param body 段取り。thisArg を this として呼ぶ
   */
  constructor(
    private readonly owner: TimelineOwner,
    private readonly body: (this: unknown, t: Steps, ...args: A) => Generator<WaitRequest, unknown, unknown>,
    readonly options: TimelineOptions = {},
    private readonly thisArg: unknown = owner,
  ) {}

  /** 動いているか */
  get running(): boolean {
    return this.gen !== undefined;
  }

  /** 最後に止まった理由（最後まで進んだら undefined） */
  get lastCancelReason(): CancelReason | undefined {
    return this.reason;
  }

  /**
   * 始める。すでに動いている、または同じ lane の別の timeline が動いているなら始めずに false。
   * 始めたら、この場で最初の yield* まで進む
   */
  start(...args: A): boolean {
    this.owner.ensureDriven?.();
    if (this.running) return false;
    if (this.options.lane && this.owner.timelines.some((t) => t !== this && t.running && t.options.lane === this.options.lane)) return false;
    this.begin(args);
    return true;
  }

  /** 同じ lane で動いているものを止めて（理由 'interrupted'）、始める。自分が動いていれば最初からやり直す */
  interrupt(...args: A): void {
    this.owner.ensureDriven?.();
    for (const t of this.owner.timelines) {
      if (t.running && (t === this || (this.options.lane && t.options.lane === this.options.lane))) t.cancel('interrupted');
    }
    this.begin(args);
  }

  /** 止める。ジェネレーターの finally と onCancel が動く */
  cancel(reason: CancelReason = 'cancel'): void {
    const gen = this.gen;
    if (!gen) return;
    this.gen = undefined;
    this.waiting = undefined;
    this.reason = reason;
    try {
      gen.return(undefined);
    } finally {
      this.options.onCancel?.(reason);
    }
  }

  private begin(args: A) {
    const clock = this.owner.clock;
    const startedAt = clock.now();
    const steps: Steps = {
      *wait(ticks: number) {
        if (ticks > 0) yield { ticks };
      },
      *until(pred: () => boolean, max?: number) {
        if (pred()) return true;
        // deadline は時計の時刻（system.currentTick）で持つ。until を呼んだ時点から max tick 後
        const result = yield { until: pred, deadline: max === undefined ? undefined : clock.now() + max };
        return result === true;
      },
      get elapsed() {
        return clock.now() - startedAt;
      },
    };
    this.reason = undefined;
    this.startedTick = startedAt;
    this.gen = this.body.call(this.thisArg, steps, ...args);
    this.step(undefined);
  }

  /** 次の yield まで進める */
  private step(input: unknown) {
    const gen = this.gen;
    if (!gen) return;
    let r: IteratorResult<WaitRequest, unknown>;
    try {
      r = gen.next(input);
    } catch (e) {
      this.gen = undefined;
      this.waiting = undefined;
      this.reason = 'error';
      this.options.onCancel?.('error');
      throw e;
    }
    // 段取りの中で自分が止められた（cancel を呼んだ）とき
    if (this.gen !== gen) return;
    if (r.done) {
      this.gen = undefined;
      this.waiting = undefined;
      return;
    }
    this.waiting = r.value;
    if ('ticks' in r.value) this.resumeAt = this.owner.clock.now() + r.value.ticks;
  }

  /** @internal 毎 tick、ランタイムから呼ばれる */
  advance(): void {
    const w = this.waiting;
    if (!this.gen || !w) return;
    const now = this.owner.clock.now();
    // start() した tick には進めない。start() はその場で最初の yield まで進めるので、
    // 同じ tick のランタイムの処理でもう一度進めると、wait(1) が 0 tick で終わってしまう。
    // （onTick の中で start() したとき、その直後にランタイムが advance を呼ぶ）
    if (now === this.startedTick) return;
    if ('ticks' in w) {
      if (now >= this.resumeAt) this.step(undefined);
    } else if (w.until()) {
      this.step(true);
    } else if (w.deadline !== undefined && now >= w.deadline) {
      this.step(false);
    }
  }
}

/** timeline を持つもの（エンティティのクラスのオブジェクト） */
export interface TimelineOwner {
  readonly timelines: Timeline<any>[];
  readonly clock: Clock;
  /** 毎 tick 進める仕組みが動いているか確かめる（動いていなければ例外） */
  ensureDriven?(): void;
}
