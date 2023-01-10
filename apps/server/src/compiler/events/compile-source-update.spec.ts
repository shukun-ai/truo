import { FlowEventSourceUpdate } from '@shukun/schema';

import { OperatorId, SourceServiceCreateDto } from '../../app.type';

import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';
import { SandboxService } from '../../sandbox/sandbox.service';

import {
  createTestingSandbox,
  createTestingContext,
} from '../../util/unit-testing/sandbox-testing.helper';

import { compileSourceUpdateEvent } from './compile-source-update';

describe('compileSourceUpdateEvent', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;
  let event: FlowEventSourceUpdate;

  beforeAll(() => {
    const testingSandbox = createTestingSandbox();
    sandboxService = testingSandbox.sandboxService;
    sourceResolverService = testingSandbox.sourceResolverService;

    jest
      .spyOn(sourceResolverService, 'update')
      .mockImplementation(
        async (
          id: string,
          orgName: string,
          atomName: string,
          dto: SourceServiceCreateDto,
          modifierId: OperatorId,
        ) => {
          expect(id).toEqual('mockId');
          expect(orgName).toEqual('mockOrgName');
          expect(atomName).toEqual('mockAtomName');
          expect(dto).toEqual({
            name: 'mockDataName',
          });
          expect(modifierId).toEqual('mockOperatorId');
          return null;
        },
      );

    event = {
      type: 'SourceUpdate',
      next: 'next',
      atomName: 'mockAtomName',
      id: `'mockId'`,
      data: { name: `'mockDataName'` },
    };
  });

  it('Should return new next and input.', async () => {
    const context = createTestingContext();
    const code = await compileSourceUpdateEvent(event);
    const computedContext = await sandboxService.executeVM(code, context);

    expect(computedContext).toEqual({
      ...context,
      input: null,
      next: 'next',
    });
  });
});
