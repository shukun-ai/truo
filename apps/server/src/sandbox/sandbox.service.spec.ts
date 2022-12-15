import { mockEmptyDependencies } from '../util/unit-testing/unit-testing.helper';

import { SourceResolverService } from './resolvers/source-resolver.service';
import { SandboxContext } from './sandbox.interface';
import { SandboxService } from './sandbox.service';

describe('SandboxService', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;
  let context: SandboxContext;

  beforeEach(() => {
    sourceResolverService = new SourceResolverService(mockEmptyDependencies());

    sandboxService = new SandboxService(sourceResolverService);

    context = {
      parameter: {},
      input: { count: 3 },
      output: null,
      next: null,
      index: 0,
      store: {},
      env: {},
      eventName: 'name',
      parentEventNames: undefined,
      orgName: 'test',
      operatorId: undefined,
    };
  });

  describe('ExecuteVM', () => {
    it('should return input 3', async () => {
      const compiledCode =
        'async function main($){return{id:$.input.count}};exports.default=main;';

      const output = await sandboxService.executeVM(compiledCode, context);

      expect(output).toEqual({ id: 3 });
    });

    it('should return input 5', async () => {
      const compiledCode =
        'async function main($){return{id:$.input.count + 2}};exports.default=main;';

      const output = await sandboxService.executeVM(compiledCode, context);

      expect(output).toEqual({ id: 5 });
    });

    it('should return input sourceResolver', async () => {
      jest
        .spyOn(sourceResolverService, 'query')
        .mockImplementation(async () => 'hello query.');

      const compiledCode =
        'async function main($,$$){return{id:await $$.sourceResolver.query()}};exports.default=main;';

      const output = await sandboxService.executeVM(compiledCode, context);

      expect(output).toEqual({ id: 'hello query.' });
    });
  });
});
