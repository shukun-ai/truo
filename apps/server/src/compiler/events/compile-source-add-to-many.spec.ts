import { AddToManyDto } from '@shukun/api';
import { FlowEventSourceAddToMany } from '@shukun/schema';

import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';
import { SandboxService } from '../../sandbox/sandbox.service';

import {
  createTestingSandbox,
  createTestingContext,
} from '../../util/unit-testing/sandbox-testing.helper';

import { compileSourceAddToManyEvent } from './compile-source-add-to-many';

describe('compileSourceAddToManyEvent', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;
  let event: FlowEventSourceAddToMany;

  beforeAll(() => {
    const testingSandbox = createTestingSandbox();
    sandboxService = testingSandbox.sandboxService;
    sourceResolverService = testingSandbox.sourceResolverService;

    jest
      .spyOn(sourceResolverService, 'addToMany')
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
      type: 'SourceAddToMany',
      next: 'next',
      atomName: 'mockAtomName',
      id: `'mockId'`,
      electronName: `'mockElectronName'`,
      foreignId: `'mockForeignId'`,
    };
  });

  it('Should return new next and input.', async () => {
    const context = createTestingContext();
    const code = await compileSourceAddToManyEvent(event);
    const computedContext = await sandboxService.executeVM(code, context);

    expect(computedContext).toEqual({
      ...context,
      input: null,
      next: 'next',
    });
  });
});
