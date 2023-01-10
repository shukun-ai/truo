import { IncreaseDto } from '@shukun/api';
import { FlowEventSourceIncrease } from '@shukun/schema';

import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';
import { SandboxService } from '../../sandbox/sandbox.service';

import {
  createTestingSandbox,
  createTestingContext,
} from '../../util/unit-testing/sandbox-testing.helper';

import { compileSourceIncreaseEvent } from './compile-source-increase';

describe('compileSourceIncreaseEvent', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;
  let event: FlowEventSourceIncrease;

  beforeAll(() => {
    const testingSandbox = createTestingSandbox();
    sandboxService = testingSandbox.sandboxService;
    sourceResolverService = testingSandbox.sourceResolverService;

    jest
      .spyOn(sourceResolverService, 'increase')
      .mockImplementation(
        async (
          id: string,
          orgName: string,
          atomName: string,
          dto: IncreaseDto,
        ) => {
          expect(id).toEqual('mockId');
          expect(orgName).toEqual('mockOrgName');
          expect(atomName).toEqual('mockAtomName');
          expect(dto).toEqual({
            electronName: 'mockElectronName',
            increment: 2,
          });
          return null;
        },
      );

    event = {
      type: 'SourceIncrease',
      next: 'next',
      id: `'mockId'`,
      atomName: 'mockAtomName',
      electronName: `'mockElectronName'`,
      increment: `2`,
    };
  });

  it('Should return new next and input.', async () => {
    const context = createTestingContext();
    const code = await compileSourceIncreaseEvent(event);
    const computedContext = await sandboxService.executeVM(code, context);

    expect(computedContext).toEqual({
      ...context,
      input: null,
      next: 'next',
    });
  });
});
