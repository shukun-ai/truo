import { FlowEventSourceQuery } from '@shukun/schema';

import { CompilerHelperService } from '../compiler-helper.service';

import { SourceQueryCompilerService } from './source-query-compiler.service';

describe('CompilerHelperService', () => {
  let sourceQueryCompilerService: SourceQueryCompilerService;
  let compilerHelperService: CompilerHelperService;

  beforeEach(() => {
    compilerHelperService = new CompilerHelperService();
    sourceQueryCompilerService = new SourceQueryCompilerService(
      compilerHelperService,
    );
  });

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

      const output = await sourceQueryCompilerService.compile(event);

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
