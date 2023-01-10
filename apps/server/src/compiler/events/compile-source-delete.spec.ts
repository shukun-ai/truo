import { FlowEventSourceDelete } from '@shukun/schema';

import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';
import { SandboxService } from '../../sandbox/sandbox.service';

import {
  createTestingSandbox,
  createTestingContext,
} from '../../util/unit-testing/sandbox-testing.helper';

import { compileSourceDeleteEvent } from './compile-source-delete';

describe('compileSourceDeleteEvent', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;
  let event: FlowEventSourceDelete;

  beforeAll(() => {
    const testingSandbox = createTestingSandbox();
    sandboxService = testingSandbox.sandboxService;
    sourceResolverService = testingSandbox.sourceResolverService;

    jest
      .spyOn(sourceResolverService, 'delete')
      .mockImplementation(
        async (id: string, orgName: string, atomName: string) => {
          expect(id).toEqual('mockId');
          expect(orgName).toEqual('mockOrgName');
          expect(atomName).toEqual('mockAtomName');
          return null;
        },
      );

    event = {
      type: 'SourceDelete',
      next: 'next',
      id: `'mockId'`,
      atomName: 'mockAtomName',
    };
  });

  it('Should return new next and input.', async () => {
    const context = createTestingContext();
    const code = await compileSourceDeleteEvent(event);
    const computedContext = await sandboxService.executeVM(code, context);

    expect(computedContext).toEqual({
      ...context,
      input: null,
      next: 'next',
    });
  });
});
