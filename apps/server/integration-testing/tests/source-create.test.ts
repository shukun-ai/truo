import { faker } from '@faker-js/faker';
import { AxiosAdaptor, IRequestAdaptor, SourceRequester } from '@shukun/api';
import { AuthenticationToken } from '@shukun/schema';
import nock from 'nock';

import { WebServer } from '../../src/app';
import { createOrg, destroyOrg, updateCodebase } from '../hooks/seed';
import { signIn } from '../hooks/sign-in';

import mockApplication from './source-create.mock.json';

describe('Source apis', () => {
  const orgName = 'test_source';
  let webServer: WebServer;
  let adaptor: IRequestAdaptor;
  let auth: AuthenticationToken | undefined;

  beforeAll(async () => {
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

    await createOrg(adaptor, { orgName });
    auth = await signIn(adaptor, { orgName });

    await updateCodebase(adaptor, mockApplication);
  });

  afterAll(async () => {
    await destroyOrg(adaptor, { orgName });
    await webServer.stop();
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
        expect(error).toMatchObject({
          status: 400,
          message: '{{electronName}}: should be required.',
          interpolationMap: { electronName: 'number' },
          internalServerCode: 'SourceRequiredException',
        });
      }
    });

    it('should throw error, when make a duplication value input.', async () => {
      const sourceRequester = new SourceRequester(adaptor, 'devices');
      const payload = {
        number: faker.datatype.string(),
        title: 'title',
        type: 'vehicle',
      };
      await sourceRequester.create(payload);

      try {
        await sourceRequester.create(payload);
      } catch (error) {
        expect(error).toMatchObject({
          status: 400,
          message: '{{electronNames}}: should be unique.',
          interpolationMap: { electronNames: 'number' },
          internalServerCode: 'SourceDuplicateException',
        });
      }
    });

    it('should throw error, when it did not pass validator.', async () => {
      const sourceRequester = new SourceRequester(adaptor, 'devices');
      try {
        await sourceRequester.create({
          number: faker.datatype.string(1200),
          title: 'title',
          type: 'vehicle',
        });
      } catch (error) {
        expect(error).toMatchObject({
          status: 400,
          message: '{{electronName}}: should be less than {{maxLength}}.',
          interpolationMap: { electronName: 'number', maxLength: 1000 },
          internalServerCode: 'SourceValidateException',
        });
      }
    });
  });
});
