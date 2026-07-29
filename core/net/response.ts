import type { HttpResponse } from '@minecraft/server-net';
import { Headers } from './headers';

/**
 * fetch API の Response を模倣したクラス
 *
 * @minecraft/server-net の HttpResponse をラップし、
 * status / ok / headers / text() / json() を提供する。
 * ボディは文字列で確定しているためストリームには対応しない。
 */
export class Response {
  readonly status: number;
  readonly ok: boolean;
  readonly headers: Headers;
  readonly url: string;

  private readonly bodyText: string;

  constructor(raw: HttpResponse) {
    this.status = raw.status;
    this.ok = raw.status >= 200 && raw.status < 300;
    this.url = raw.request.uri;
    this.bodyText = raw.body;
    this.headers = new Headers(
      raw.headers.map((header): [string, string] => [header.key, String(header.value)])
    );
  }

  text(): string {
    return this.bodyText;
  }

  json(): unknown {
    return JSON.parse(this.bodyText);
  }
}
