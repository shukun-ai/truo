import { FlowEventSourceQuery } from '@shukun/schema';

import { compileSourceQueryEvent } from './compile-source-query';
describe('CompilerHelperService', () => {
  describe('compileJsonExpression', () => {
    it('should return stringify', async () => {
      const event: FlowEventSourceQuery = {
        type: 'SourceQuery',
        next: '',
        atomName: 'start',
        query: {
          filter: {
            name: {
              $eq: "'Hello ' + $.input",
            },
            count: {
              $gt: '$.input',
            },
          },
          select: {
            name: true,
          },
        },
      };

      const output = await compileSourceQueryEvent(event);

      expect(output).toEqual(`
        async function main($){
            const orgName = $.orgName;
            const atomName = "start";
            const query = {"filter":{"name":{"$eq":'Hello ' + $.input},"count":{"$gt":$.input}},"select":{"name":true}};
            return await $.sourceResolver.query($.orgName, atomName, query);
        };
        exports.default=main;
    `);
    });
  });
});
