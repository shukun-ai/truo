import { FlowEventSourceQuery } from '@shukun/schema';

import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';
import { SandboxService } from '../../sandbox/sandbox.service';
import { createSandboxTesting } from '../../util/unit-testing/sandbox-testing.helper';

import { compileSourceQueryEvent } from './compile-source-query';
describe('compileSourceQueryEvent', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;

  const event: FlowEventSourceQuery = {
    type: 'SourceQuery',
    next: 'test',
    atomName: 'start',
    query: {
      filter: {
        name: {
          $eq: "'Hello ' + $.input.vehicleId",
        },
        count: {
          $gt: '$.input.vehicleId',
        },
      },
      select: {
        name: true,
      },
    },
  };

  beforeAll(() => {
    const sandboxTesting = createSandboxTesting();
    sandboxService = sandboxTesting.sandboxService;
    sourceResolverService = sandboxTesting.sourceResolverService;

    jest
      .spyOn(sourceResolverService, 'query')
      .mockImplementation(
        async (orgName: string, atomName: string, query: unknown) => ({
          orgName,
          atomName,
          query,
        }),
      );
  });

  it('should return stringify', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: { vehicleId: 'mockVehicleId' },
      orgName: 'orgNameMock',
    };

    const code = await compileSourceQueryEvent(event);
    const computedContext = await sandboxService.executeVM(code, context);

    expect(computedContext).toEqual({
      ...context,
      input: {
        orgName: 'orgNameMock',
        atomName: 'start',
        query: {
          filter: {
            name: {
              $eq: 'Hello ' + 'mockVehicleId',
            },
            count: {
              $gt: 'mockVehicleId',
            },
          },
          select: {
            name: true,
          },
        },
      },
      next: 'test',
    });
  });

  it('should return stringify', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: null,
    };

    const code = await compileSourceQueryEvent(event);

    expect(sandboxService.executeVM(code, context)).rejects.toThrow();
  });
});
