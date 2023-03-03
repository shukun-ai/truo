import { getRegex } from './replace-code';

describe('replace-code', () => {
  it('getRegex', () => {
    const text =
      '{ "help": "{{code:test-file}}", "hello": "{{code:test/file.ts}}", "world": "{{code:test_file.ts}}" }';
    const replacedCode = text.match(getRegex());
    expect(replacedCode).toEqual([
      '{{code:test-file}}',
      '{{code:test/file.ts}}',
      '{{code:test_file.ts}}',
    ]);
  });
});
