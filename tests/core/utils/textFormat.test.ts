import { describe, expect, it } from 'vitest';
import { TextFormat } from '@/utils/textFormat';

describe('TextFormat.tokenize', () => {
  it('splits color/format codes from plain text', () => {
    const input = `${TextFormat.RED}Hello${TextFormat.RESET} World`;
    expect(TextFormat.tokenize(input)).toEqual([
      TextFormat.RED,
      'Hello',
      TextFormat.RESET,
      ' World',
    ]);
  });

  it('returns an empty array for an empty string', () => {
    expect(TextFormat.tokenize('')).toEqual([]);
  });

  it('returns a single element for text with no codes', () => {
    expect(TextFormat.tokenize('plain text')).toEqual(['plain text']);
  });

  it('handles consecutive codes with no text between them', () => {
    const input = `${TextFormat.BOLD}${TextFormat.RED}Hi`;
    expect(TextFormat.tokenize(input)).toEqual([
      TextFormat.BOLD,
      TextFormat.RED,
      'Hi',
    ]);
  });
});

describe('TextFormat.clean', () => {
  it('strips minecraft formatting codes', () => {
    const input = `${TextFormat.BOLD}${TextFormat.RED}Hello${TextFormat.RESET}`;
    expect(TextFormat.clean(input)).toBe('Hello');
  });

  it('strips ANSI escape sequences', () => {
    const input = '\x1b[31mRed\x1b[0m Text';
    expect(TextFormat.clean(input)).toBe('Red Text');
  });

  it('strips private-use-area characters', () => {
    const input = 'Icon Label';
    expect(TextFormat.clean(input)).toBe('Icon Label');
  });

  it('strips a mix of minecraft, ANSI, and private-use characters', () => {
    const input = `${TextFormat.RED}\x1b[1mAlert${TextFormat.RESET}\x1b[0m`;
    expect(TextFormat.clean(input)).toBe('Alert');
  });
});

describe('TextFormat.colorize', () => {
  it('converts default "&" placeholder codes to section codes', () => {
    expect(TextFormat.colorize('&cHello')).toBe(`${TextFormat.RED}Hello`);
  });

  it('supports a custom placeholder character', () => {
    expect(TextFormat.colorize('%cHello', '%')).toBe(`${TextFormat.RED}Hello`);
  });

  it('matches the code letter case-insensitively but keeps the matched case', () => {
    // Note: matching is case-insensitive (/gi) but the replacement uses the
    // captured letter as-is, so an uppercase code does NOT normalize to the
    // lowercase TextFormat.RED constant.
    expect(TextFormat.colorize('&CHello')).toBe(`${TextFormat.ESCAPE}CHello`);
  });

  it('leaves unmatched placeholder sequences untouched', () => {
    expect(TextFormat.colorize('&zHello')).toBe('&zHello');
  });
});

describe('TextFormat.addBase', () => {
  it('prefixes input with a reset + base format', () => {
    expect(TextFormat.addBase(TextFormat.RED, 'Hello')).toBe(
      `${TextFormat.RESET}${TextFormat.RED}Hello`
    );
  });

  it('reapplies the base format after a reset inside the input', () => {
    const input = `Hello${TextFormat.RESET}World`;
    const base = `${TextFormat.RESET}${TextFormat.RED}`;
    expect(TextFormat.addBase(TextFormat.RED, input)).toBe(
      `${base}Hello${base}World`
    );
  });

  it('reapplies the base format after every reset inside the input', () => {
    const input = `Hello${TextFormat.RESET}World${TextFormat.RESET}Foo`;
    const base = `${TextFormat.RESET}${TextFormat.RED}`;
    expect(TextFormat.addBase(TextFormat.RED, input)).toBe(
      `${base}Hello${base}World${base}Foo`
    );
  });

  it('throws when the base format contains a non-format token', () => {
    expect(() => TextFormat.addBase('not-a-code', 'Hello')).toThrow(
      'Unexpected base format token \'not-a-code\''
    );
  });
});

describe('TextFormat.javaToBedrock', () => {
  it('strips redstone and copper codes', () => {
    const input = `${TextFormat.ESCAPE}mfoo${TextFormat.ESCAPE}nbar`;
    expect(TextFormat.javaToBedrock(input)).toBe('foobar');
  });

  it('leaves text without those codes unchanged', () => {
    const input = `${TextFormat.RED}Hello${TextFormat.RESET}`;
    expect(TextFormat.javaToBedrock(input)).toBe(input);
  });
});

describe('TextFormat.toHTML', () => {
  it('wraps a colored token in a span and closes it on reset', () => {
    const input = `${TextFormat.RED}Hello${TextFormat.RESET}`;
    expect(TextFormat.toHTML(input)).toBe(
      `<span style='color:#F55'>Hello</span>`
    );
  });

  it('auto-closes open spans at the end when there is no explicit reset', () => {
    const input = `${TextFormat.GREEN}Hi`;
    expect(TextFormat.toHTML(input)).toBe(
      `<span style='color:#5F5'>Hi</span>`
    );
  });

  it('nests spans when colors change without an intervening reset', () => {
    const input = `${TextFormat.RED}A${TextFormat.BLUE}B${TextFormat.RESET}`;
    expect(TextFormat.toHTML(input)).toBe(
      `<span style='color:#F55'>A<span style='color:#55F'>B</span></span>`
    );
  });

  it('combines format and color spans', () => {
    const input = `${TextFormat.BOLD}${TextFormat.RED}Text${TextFormat.RESET}`;
    expect(TextFormat.toHTML(input)).toBe(
      `<span style='font-weight:bold'><span style='color:#F55'>Text</span></span>`
    );
  });

  it('passes through plain text with no codes unchanged', () => {
    expect(TextFormat.toHTML('plain text')).toBe('plain text');
  });
});
