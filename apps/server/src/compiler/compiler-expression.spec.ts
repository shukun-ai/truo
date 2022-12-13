import { FlowEventSourceQuery } from '@shukun/schema';

import { compileJsonTemplate } from './compiler-expression';

describe('CompilerHelperService', () => {
  describe('compileJsonExpression', () => {
    it('should return stringify', async () => {
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

    // it('should throw FlowInjectionException', async () => {
    //   const input: FlowEventSourceQuery['query'] = {
    //     filter: {
    //       name: {
    //         $eq: '${$.sourceResolver.query()}',
    //       },
    //     },
    //     select: {
    //       name: true,
    //     },
    //   };

    //   expect(compilerHelperService.compileJsonTemplate(input)).toThrow();
    // });
  });
});
