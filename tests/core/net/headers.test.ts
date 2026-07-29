import { describe, expect, it } from 'vitest';
import { Headers } from '@/net/headers';

describe('Headers', () => {
  it('normalizes header names to lowercase', () => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    expect(headers.get('content-type')).toBe('application/json');
    expect(headers.get('CONTENT-TYPE')).toBe('application/json');
  });

  it('initializes from a plain object', () => {
    const headers = new Headers({ 'X-Foo': 'bar' });
    expect(headers.get('x-foo')).toBe('bar');
  });

  it('initializes from an entries array', () => {
    const headers = new Headers([['X-Foo', 'bar'], ['X-Baz', 'qux']]);
    expect(headers.get('x-foo')).toBe('bar');
    expect(headers.get('x-baz')).toBe('qux');
  });

  it('initializes from another Headers instance', () => {
    const source = new Headers({ 'X-Foo': 'bar' });
    const copy = new Headers(source);
    expect(copy.get('x-foo')).toBe('bar');
  });

  it('returns null for a missing header', () => {
    expect(new Headers().get('missing')).toBeNull();
  });

  it('append joins values for the same header with a comma', () => {
    const headers = new Headers();
    headers.append('X-Foo', 'a');
    headers.append('X-Foo', 'b');
    expect(headers.get('x-foo')).toBe('a, b');
  });

  it('set overwrites an existing header', () => {
    const headers = new Headers({ 'X-Foo': 'a' });
    headers.set('X-Foo', 'b');
    expect(headers.get('x-foo')).toBe('b');
  });

  it('has/delete report and remove a header', () => {
    const headers = new Headers({ 'X-Foo': 'a' });
    expect(headers.has('x-foo')).toBe(true);
    headers.delete('X-Foo');
    expect(headers.has('x-foo')).toBe(false);
  });

  it('is iterable via entries() and Symbol.iterator', () => {
    const headers = new Headers({ 'X-Foo': 'a', 'X-Bar': 'b' });
    expect([...headers]).toEqual(expect.arrayContaining([['x-foo', 'a'], ['x-bar', 'b']]));
    expect([...headers.entries()]).toEqual([...headers]);
  });
});
