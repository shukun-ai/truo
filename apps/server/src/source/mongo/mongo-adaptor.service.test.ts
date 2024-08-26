import { DataSourceConnection } from '@shukun/schema';

import { SourceServiceCreateDto } from '../../app.type';
import { SourceFieldFilterService } from '../source-field-filter.service';

import { MongoAdaptorService } from './mongo-adaptor.service';
import { MongoQueryConvertorService } from './mongo-query-convertor.service';
import { MongooseConnectionService } from './mongoose-connection.service';
import { MongoExceptionHandlerService } from './monogo-exception-handler.service';

describe('MongoAdaptorService', () => {
  let mongooseConnectionService: MongooseConnectionService;
  let mongoQueryConvertorService: MongoQueryConvertorService;
  let sourceFieldFilterService: SourceFieldFilterService;
  let mongoExceptionHandlerService: MongoExceptionHandlerService;
  let service: MongoAdaptorService<any>;

  beforeEach(() => {
    mongooseConnectionService = jest.fn() as any;
    mongoQueryConvertorService = jest.fn() as any;
    sourceFieldFilterService = jest.fn() as any;
    mongoExceptionHandlerService = jest.fn() as any;

    const atomModel = jest.fn();
    atomModel.mockImplementation((params) => ({
      ...params,
      save: jest.fn(() => {
        Promise.resolve();
      }),
      toJSON: jest.fn(() => params),
    }));
    mongooseConnectionService.getAtomModel = jest
      .fn()
      .mockResolvedValue(atomModel);

    sourceFieldFilterService.filter = jest.fn((json) => json);

    service = new MongoAdaptorService<any>(
      mongooseConnectionService,
      mongoQueryConvertorService,
      sourceFieldFilterService,
      mongoExceptionHandlerService,
    );
  });

  it('create with owner', async () => {
    const dataSourceConnection = {} as DataSourceConnection;
    const orgName = 'testOrg';
    const metadata = {
      name: 'test',
      label: 'test',
      electrons: [],
    };
    const params = {
      test: 'test',
    } as SourceServiceCreateDto;
    const ownerId = 'testOwner';

    const result: any = await service.createOne(
      dataSourceConnection,
      orgName,
      metadata,
      params,
      ownerId,
    );
    expect(result.test).toBe('test');
    expect(result.owner).toBe('testOwner');
  });

  it('create without owner', async () => {
    const dataSourceConnection = {} as DataSourceConnection;
    const orgName = 'testOrg';
    const metadata = {
      name: 'test',
      label: 'test',
      electrons: [],
    };
    const params = {
      test: 'test',
    } as SourceServiceCreateDto;
    const ownerId = null;

    const result: any = await service.createOne(
      dataSourceConnection,
      orgName,
      metadata,
      params,
      ownerId,
    );
    expect(result.test).toBe('test');
    expect(result.owner).toBe(null);
  });
});
