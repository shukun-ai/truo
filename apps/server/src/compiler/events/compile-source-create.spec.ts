import { FlowEventSourceCreate } from '@shukun/schema';

import { OperatorId, SourceServiceCreateDto } from '../../app.type';

import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';
import { SandboxService } from '../../sandbox/sandbox.service';

import {
  createTestingSandbox,
  createTestingContext,
} from '../../util/unit-testing/sandbox-testing.helper';
import { compileCommonWrapper } from '../wrappers/compile-common-wrapper';

import { compileSourceCreateEvent } from './compile-source-create';

describe('compileSourceCreateEvent', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;
  let event: FlowEventSourceCreate;

  beforeAll(() => {
    const testingSandbox = createTestingSandbox();
    sandboxService = testingSandbox.sandboxService;
    sourceResolverService = testingSandbox.sourceResolverService;

    jest
      .spyOn(sourceResolverService, 'create')
      .mockImplementation(
        async (
          orgName: string,
          atomName: string,
          dto: SourceServiceCreateDto,
          ownerId: OperatorId,
        ) => {
          expect(orgName).toEqual('mockOrgName');
          expect(atomName).toEqual('mockAtomName');
          expect(dto).toEqual({
            name: 'mockDataName',
          });
          expect(ownerId).toEqual('mockOperatorId');
          return { _id: 'mockNewId' };
        },
      );

    event = {
      type: 'SourceCreate',
      next: 'next',
      atomName: 'mockAtomName',
      data: { name: `'mockDataName'` },
    };
  });

  it('Should return new next and input.', async () => {
    const context = createTestingContext();
    const code = await compileSourceCreateEvent(event);
    const wrappedCode = await compileCommonWrapper(code);
    const computedContext = await sandboxService.executeVM(
      wrappedCode,
      context,
    );

    expect(computedContext).toEqual({
      ...context,
      input: { _id: 'mockNewId' },
      next: 'next',
    });
  });
});
