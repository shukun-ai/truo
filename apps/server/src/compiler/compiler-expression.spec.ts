import { FlowBadCompileException } from '@shukun/exception';
import { FlowEventSourceQuery } from '@shukun/schema';

import { checkInjection, compileJsonTemplate } from './compiler-expression';

describe('CompilerHelperService', () => {
  describe('compileJsonExpression', () => {
    it('Test stringify and intercept', async () => {
      const input: FlowEventSourceQuery['query'] = {
        filter: {
          name: {
            $eq: "'Hello ' + $.input",
          },
        },
        select: {
          name: true,
        },
      };

      const output = compileJsonTemplate(input);

      expect(output).toEqual(
        '{"filter":{"name":{"$eq":\'Hello \' + $.input}},"select":{"name":true}}',
      );
    });

    it('Test array input', async () => {
      const input = ["'Hello ' + $.input", 1, 2, 3, 4];

      const output = compileJsonTemplate(input);

      expect(output).toEqual("['Hello ' + $.input,1,2,3,4]");
    });
  });

  describe('checkInjection', () => {
    it('should pass, when allowed functions', () => {
      const input = 'electrons.map((electron) => { return $$.date.now(); });';
      const output = checkInjection(input);
      expect(output).toEqual(input);
    });

    it('should throw error, when has "$$._sourceResolver.".', () => {
      const input =
        'electrons.map((electron) => { return $$._sourceResolver.query(); });';
      expect(() => checkInjection(input)).toThrow(
        new FlowBadCompileException(
          'Do not allow to use private method in code, like: $$._',
        ),
      );
    });

    it('should throw error, when has "$$._sourceResolver;".', () => {
      const input =
        'electrons.map((electron) => { return $$._sourceResolver; });';
      expect(() => checkInjection(input)).toThrow(
        new FlowBadCompileException(
          'Do not allow to use private method in code, like: $$._',
        ),
      );
    });

    it('should throw error, when has "$$._sourceResolver90(".', () => {
      const input =
        'electrons.map((electron) => { return $$._sourceResolver90(); });';
      expect(() => checkInjection(input)).toThrow(
        new FlowBadCompileException(
          'Do not allow to use private method in code, like: $$._',
        ),
      );
    });

    it('should throw error, when has "$$._sourceResolver ".', () => {
      const input =
        'electrons.map((electron) => { return $$._sourceResolver user; });';
      expect(() => checkInjection(input)).toThrow(
        new FlowBadCompileException(
          'Do not allow to use private method in code, like: $$._',
        ),
      );
    });
  });
});
