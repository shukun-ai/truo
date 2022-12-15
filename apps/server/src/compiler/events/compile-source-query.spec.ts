import { FlowEventSourceQuery } from '@shukun/schema';

import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';
import { SandboxService } from '../../sandbox/sandbox.service';
import { mockEmptyDependencies } from '../../util/unit-testing/unit-testing.helper';

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
    sourceResolverService = new SourceResolverService(mockEmptyDependencies());
    sandboxService = new SandboxService(sourceResolverService);

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
    const output = await sandboxService.executeVM(code, context);

    expect(output).toEqual({
      ...context,
      output: {
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
