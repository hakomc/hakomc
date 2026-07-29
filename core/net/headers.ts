/** Headers のコンストラクタに渡せる初期値の型 */
export type HeadersInit = Headers | Record<string, string> | [string, string][];

/**
 * fetch API の Headers を模倣したクラス
 */
export class Headers {
  private map = new Map<string, string>();

  constructor(init?: HeadersInit) {
    if (!init) return;

    if (init instanceof Headers) {
      init.forEach((value, key) => this.set(key, value));
    } else if (Array.isArray(init)) {
      for (const [key, value] of init) this.append(key, value);
    } else {
      for (const key of Object.keys(init)) this.set(key, init[key]);
    }
  }

  private normalize(name: string): string {
    return name.toLowerCase();
  }

  /**
   * ヘッダーを追加する。同名のヘッダーが存在する場合は値をカンマ区切りで連結する。
   */
  append(name: string, value: string): void {
    const key = this.normalize(name);
    const existing = this.map.get(key);
    this.map.set(key, existing !== undefined ? `${existing}, ${value}` : value);
  }

  /**
   * ヘッダーを設定する。同名のヘッダーが存在する場合は値を上書きする。
   */
  set(name: string, value: string): void {
    this.map.set(this.normalize(name), value);
  }

  /**
   * ヘッダーの値を取得する。存在しない場合は null を返す。
   */
  get(name: string): string | null {
    return this.map.get(this.normalize(name)) ?? null;
  }

  has(name: string): boolean {
    return this.map.has(this.normalize(name));
  }

  delete(name: string): void {
    this.map.delete(this.normalize(name));
  }

  forEach(callback: (value: string, key: string, parent: Headers) => void): void {
    this.map.forEach((value, key) => callback(value, key, this));
  }

  *entries(): IterableIterator<[string, string]> {
    yield* this.map.entries();
  }

  *keys(): IterableIterator<string> {
    yield* this.map.keys();
  }

  *values(): IterableIterator<string> {
    yield* this.map.values();
  }

  [Symbol.iterator](): IterableIterator<[string, string]> {
    return this.entries();
  }
}
