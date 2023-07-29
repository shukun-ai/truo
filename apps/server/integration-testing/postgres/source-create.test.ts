import { faker } from '@faker-js/faker';
import {
  ApiResponseException,
  AxiosAdaptor,
  IRequestAdaptor,
  SourceRequester,
} from '@shukun/api';
import { AuthenticationToken, DataSourceConnection } from '@shukun/schema';
import nock from 'nock';

import { WebServer } from '../../src/app';
import { createDatabase, destroyDatabase } from '../hooks/database';
import { executeMigration } from '../hooks/migration';
import {
  destroyOrg,
  hasOrCreateOrg,
  updateCodebase,
  updateDataSource,
} from '../hooks/seed';
import { signIn } from '../hooks/sign-in';

import mockApplication from './source-create.mock.json';

describe('Source apis', () => {
  const orgName = 'postgres_source_create_org';
  const connection: DataSourceConnection = {
    type: 'postgres',
    host: 'localhost',
    port: 25432,
    username: 'test',
    password: 'test',
    database: 'create_test',
    metadata: ['devices'],
    maxPools: 3,
  };
  let webServer: WebServer;
  let adaptor: IRequestAdaptor;
  let auth: AuthenticationToken | undefined;

  beforeAll(async () => {
    await destroyDatabase(connection);
    await createDatabase(connection);

    webServer = new WebServer({ ci: true });
    const apiConnection = await webServer.start();

    nock.disableNetConnect();
    nock.enableNetConnect('127.0.0.1');

    adaptor = new AxiosAdaptor({
      baseUrl: `http://127.0.0.1:${apiConnection.port}/apis/v1`,
      timeout: 10 * 1000,
      retries: 1,
      onOrgName: () => orgName,
      onAccessToken: () => auth?.accessToken ?? null,
    });

    await hasOrCreateOrg(adaptor, { orgName });

    auth = await signIn(adaptor, { orgName });

    await updateCodebase(adaptor, mockApplication);

    await updateDataSource(adaptor, {
      connections: {
        postgres: connection,
      },
    });

    await executeMigration(adaptor);
  });

  afterAll(async () => {
    await destroyOrg(adaptor, { orgName });
    await webServer.stop();
    await destroyDatabase(connection);
    nock.enableNetConnect();
  });

  describe('Make wrong create request.', () => {
    it('should throw error, when the number is required, but we did not set it.', async () => {
      const sourceRequester = new SourceRequester(adaptor, 'devices');
      try {
        await sourceRequester.create({
          number: undefined,
          title: 'title',
          type: 'vehicle',
        });
      } catch (error) {
        expect(error).toEqual(
          new ApiResponseException(
            400,
            '{{electronName}}: should be required.',
            { electronName: 'number' },
            'SourceRequiredException',
          ),
        );
      }
    });

    it('should throw error, when make a duplication value input.', async () => {
      const sourceRequester = new SourceRequester(adaptor, 'devices');
      const payload = {
        number: faker.string.sample(),
        title: 'title',
        type: 'vehicle',
      };
      await sourceRequester.create(payload);

      try {
        await sourceRequester.create(payload);
      } catch (error) {
        expect(error).toEqual(
          new ApiResponseException(
            400,
            '{{electronNames}} should be unique',
            { electronNames: 'number' },
            'SourceDuplicateException',
          ),
        );
      }
    });

    it('should throw error, when it did not pass validator.', async () => {
      const sourceRequester = new SourceRequester(adaptor, 'devices');
      try {
        await sourceRequester.create({
          number: faker.string.sample(1200),
          title: 'title',
          type: 'vehicle',
        });
      } catch (error) {
        expect(error).toEqual(
          new ApiResponseException(
            400,
            '{{electronName}}: should be less than {{maxLength}}.',
            { electronName: 'number', maxLength: 1000 },
            'SourceValidateException',
          ),
        );
      }
    });
  });
});
