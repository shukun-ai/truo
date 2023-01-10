import { compileCommonWrapper } from './compile-common-wrapper';

describe('compileCommonWrapper', () => {
  it('should return wrapped code with $, $$, $$$.', async () => {
    const output = await compileCommonWrapper('return null;');
    expect(output.trim()).toEqual(
      `
        async function main($, $$, $$$){
          return null;
        };
        exports.default=main;
      `.trim(),
    );
  });
});
