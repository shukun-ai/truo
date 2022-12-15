import { FlowEventSourceQuery } from '@shukun/schema';

import { compileJsonTemplate } from './compiler-expression';

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
});
