import { http, HttpHeader, HttpRequest, HttpRequestMethod } from '@minecraft/server-net';
import { Headers, type HeadersInit } from './headers';
import { Response } from './response';

/** fetch() のオプション */
export interface FetchInit {
  /** HTTPメソッド (既定値: GET) */
  method?: string;

  /** リクエストヘッダー */
  headers?: HeadersInit;

  /** リクエストボディ */
  body?: string;

  /** タイムアウト (秒) @minecraft/server-net 独自の拡張 */
  timeout?: number;
}

const SUPPORTED_METHODS = Object.values(HttpRequestMethod) as string[];
const METHOD_LOOKUP = new Map<string, HttpRequestMethod>(
  SUPPORTED_METHODS.map(method => [method.toUpperCase(), method as HttpRequestMethod])
);

function resolveMethod(method: string): HttpRequestMethod {
  const resolved = METHOD_LOOKUP.get(method.toUpperCase());
  if (!resolved) {
    throw new TypeError(
      `@minecraft/server-net does not support the "${method}" method. Supported methods: ${SUPPORTED_METHODS.join(', ')}`
    );
  }
  return resolved;
}

/**
 * @minecraft/server-net の HttpClient を fetch API 風のインターフェースで呼び出す。
 * Bedrock Dedicated Server 上でのみ動作する。
 */
export async function fetch(input: string, init: FetchInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);

  const request = new HttpRequest(input).setMethod(resolveMethod(init.method ?? 'GET'));

  if (init.body !== undefined) request.setBody(init.body);
  if (init.timeout !== undefined) request.setTimeout(init.timeout);

  const httpHeaders: HttpHeader[] = [];
  headers.forEach((value, key) => httpHeaders.push(new HttpHeader(key, value)));
  request.setHeaders(httpHeaders);

  const raw = await http.request(request);
  return new Response(raw);
}
