import { beforeEach, describe, expect, it, vi } from 'vitest';

const { httpMock, HttpRequestMock, HttpHeaderMock, HttpRequestMethod } = vi.hoisted(() => {
  class HttpHeaderMock {
    constructor(public key: string, public value: string) {}
  }

  class HttpRequestMock {
    method?: string;
    body?: string;
    timeout?: number;
    headers: HttpHeaderMock[] = [];

    constructor(public uri: string) {}

    setMethod(method: string) {
      this.method = method;
      return this;
    }
    setBody(body: string) {
      this.body = body;
      return this;
    }
    setTimeout(timeout: number) {
      this.timeout = timeout;
      return this;
    }
    setHeaders(headers: HttpHeaderMock[]) {
      this.headers = headers;
      return this;
    }
  }

  return {
    httpMock: { request: vi.fn() },
    HttpRequestMock,
    HttpHeaderMock,
    HttpRequestMethod: { DELETE: 'DELETE', GET: 'GET', HEAD: 'HEAD', POST: 'POST', PUT: 'PUT' },
  };
});

vi.mock('@minecraft/server-net', () => ({
  http: httpMock,
  HttpRequest: HttpRequestMock,
  HttpHeader: HttpHeaderMock,
  HttpRequestMethod,
}));

import { fetch } from '@/net/fetch';

function mockHttpResponse(opts: {
  status: number;
  body: string;
  uri: string;
  headers?: { key: string; value: string }[];
}) {
  return {
    status: opts.status,
    body: opts.body,
    headers: opts.headers ?? [],
    request: { uri: opts.uri },
  };
}

describe('fetch', () => {
  beforeEach(() => {
    httpMock.request.mockReset();
  });

  it('defaults to GET and wraps the response', async () => {
    httpMock.request.mockResolvedValue(mockHttpResponse({
      status: 200,
      body: '{"ok":true}',
      uri: 'https://example.com',
      headers: [{ key: 'Content-Type', value: 'application/json' }],
    }));

    const res = await fetch('https://example.com');

    expect(httpMock.request).toHaveBeenCalledTimes(1);
    const sent = httpMock.request.mock.calls[0][0] as InstanceType<typeof HttpRequestMock>;
    expect(sent.uri).toBe('https://example.com');
    expect(sent.method).toBe('GET');
    expect(res.status).toBe(200);
    expect(res.ok).toBe(true);
    expect(res.url).toBe('https://example.com');
    expect(res.headers.get('content-type')).toBe('application/json');
    expect(res.json()).toEqual({ ok: true });
  });

  it('sends method/body/headers/timeout as configured', async () => {
    httpMock.request.mockResolvedValue(mockHttpResponse({
      status: 201,
      body: 'created',
      uri: 'https://example.com/items',
    }));

    const res = await fetch('https://example.com/items', {
      method: 'post',
      headers: { 'X-Test': 'abc' },
      body: '{"name":"a"}',
      timeout: 5,
    });

    const sent = httpMock.request.mock.calls[0][0] as InstanceType<typeof HttpRequestMock>;
    expect(sent.method).toBe('POST');
    expect(sent.body).toBe('{"name":"a"}');
    expect(sent.timeout).toBe(5);
    expect(sent.headers).toEqual([{ key: 'x-test', value: 'abc' }]);
    expect(res.status).toBe(201);
    expect(res.text()).toBe('created');
  });

  it('marks non-2xx responses as not ok', async () => {
    httpMock.request.mockResolvedValue(mockHttpResponse({
      status: 404,
      body: 'not found',
      uri: 'https://example.com/missing',
    }));

    const res = await fetch('https://example.com/missing');
    expect(res.ok).toBe(false);
  });

  it('rejects with TypeError for a method @minecraft/server-net does not support', async () => {
    await expect(fetch('https://example.com', { method: 'PATCH' })).rejects.toThrow(TypeError);
    expect(httpMock.request).not.toHaveBeenCalled();
  });

  it('merges duplicate response headers with a comma', async () => {
    httpMock.request.mockResolvedValue(mockHttpResponse({
      status: 200,
      body: '',
      uri: 'https://example.com',
      headers: [
        { key: 'Cache-Control', value: 'no-cache' },
        { key: 'cache-control', value: 'no-store' },
      ],
    }));

    const res = await fetch('https://example.com');
    expect(res.headers.get('Cache-Control')).toBe('no-cache, no-store');
  });

  it('accepts headers as an array of tuples', async () => {
    httpMock.request.mockResolvedValue(mockHttpResponse({
      status: 200,
      body: '',
      uri: 'https://example.com',
    }));

    await fetch('https://example.com', { headers: [['X-Test', 'abc'], ['X-Test', 'def']] });

    const sent = httpMock.request.mock.calls[0][0] as InstanceType<typeof HttpRequestMock>;
    expect(sent.headers).toEqual([{ key: 'x-test', value: 'abc, def' }]);
  });

  it('does not call setTimeout when timeout is not specified', async () => {
    httpMock.request.mockResolvedValue(mockHttpResponse({
      status: 200,
      body: '',
      uri: 'https://example.com',
    }));

    await fetch('https://example.com');

    const sent = httpMock.request.mock.calls[0][0] as InstanceType<typeof HttpRequestMock>;
    expect(sent.timeout).toBeUndefined();
  });
});
