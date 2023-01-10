import { AddToManyDto } from '@shukun/api';
import { FlowEventSourceRemoveFromMany } from '@shukun/schema';

import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';
import { SandboxService } from '../../sandbox/sandbox.service';

import {
  createTestingSandbox,
  createTestingContext,
} from '../../util/unit-testing/sandbox-testing.helper';
import { compileCommonWrapper } from '../wrappers/compile-common-wrapper';

import { compileSourceRemoveFromManyEvent } from './compile-source-remove-from-many';

describe('compileSourceRemoveFromManyEvent', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;
  let event: FlowEventSourceRemoveFromMany;

  beforeAll(() => {
    const testingSandbox = createTestingSandbox();
    sandboxService = testingSandbox.sandboxService;
    sourceResolverService = testingSandbox.sourceResolverService;

    jest
      .spyOn(sourceResolverService, 'removeFromMany')
      .mockImplementation(
        async (
          id: string,
          orgName: string,
          atomName: string,
          dto: AddToManyDto,
        ) => {
          expect(id).toEqual('mockId');
          expect(orgName).toEqual('mockOrgName');
          expect(atomName).toEqual('mockAtomName');
          expect(dto.electronName).toEqual('mockElectronName');
          expect(dto.foreignId).toEqual('mockForeignId');
          return null;
        },
      );

    event = {
      type: 'SourceRemoveFromMany',
      next: 'next',
      atomName: 'mockAtomName',
      id: `'mockId'`,
      electronName: `'mockElectronName'`,
      foreignId: `'mockForeignId'`,
    };
  });

  it('Should return new next and input.', async () => {
    const context = createTestingContext();
    const code = await compileSourceRemoveFromManyEvent(event);
    const wrappedCode = await compileCommonWrapper(code);
    const computedContext = await sandboxService.executeVM(
      wrappedCode,
      context,
    );

    expect(computedContext).toEqual({
      ...context,
      input: null,
      next: 'next',
    });
  });
});
