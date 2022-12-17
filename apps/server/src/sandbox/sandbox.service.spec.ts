import { mockEmptyDependencies } from '../util/unit-testing/unit-testing.helper';

import { DateResolverService } from './resolvers/date-resolver.service';

import { SourceResolverService } from './resolvers/source-resolver.service';
import { SandboxContext } from './sandbox.interface';
import { SandboxService } from './sandbox.service';

describe('SandboxService', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;
  let dateResolverService: DateResolverService;
  let context: SandboxContext;

  beforeEach(() => {
    sourceResolverService = new SourceResolverService(mockEmptyDependencies());
    dateResolverService = new DateResolverService();

    sandboxService = new SandboxService(
      sourceResolverService,
      dateResolverService,
    );

    context = {
      parameter: {},
      input: { count: 3 },
      next: '',
      index: 0,
      store: {},
      env: {},
      orgName: 'test',
      operatorId: undefined,
    };
  });

  describe('ExecuteVM', () => {
    it('should return input 3', async () => {
      const compiledCode =
        'async function main($){return{id:$.input.count}};exports.default=main;';

      const computedContext = await sandboxService.executeVM(
        compiledCode,
        context,
      );

      expect(computedContext).toEqual({ id: 3 });
    });

    it('should return input 5', async () => {
      const compiledCode =
        'async function main($){return{id:$.input.count + 2}};exports.default=main;';

      const computedContext = await sandboxService.executeVM(
        compiledCode,
        context,
      );

      expect(computedContext).toEqual({ id: 5 });
    });

    it('should return input sourceResolver', async () => {
      jest
        .spyOn(sourceResolverService, 'query')
        .mockImplementation(async () => 'hello query.');

      const compiledCode =
        'async function main($,$$){return{id:await $$.sourceResolver.query()}};exports.default=main;';

      const computedContext = await sandboxService.executeVM(
        compiledCode,
        context,
      );

      expect(computedContext).toEqual({ id: 'hello query.' });
    });
  });
});
