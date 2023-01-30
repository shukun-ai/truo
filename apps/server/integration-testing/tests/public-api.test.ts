import { AxiosAdaptor, IRequestAdaptor, PublicRequester } from '@shukun/api';
import nock from 'nock';

import { initializeWebServer, stopWebServer } from '../../src/app';
import { createOrg, destroyOrg } from '../hooks/seed';

describe('PublicRequester', () => {
  const orgName = 'test_source';
  let adaptor: IRequestAdaptor;

  beforeAll(async () => {
    const apiConnection = await initializeWebServer({ ci: true });

    nock.disableNetConnect();
    nock.enableNetConnect('127.0.0.1');

    adaptor = new AxiosAdaptor({
      baseUrl: `http://127.0.0.1:${apiConnection.port}/apis/v1`,
      timeout: 10 * 1000,
      retries: 1,
      onOrgName: () => orgName,
      onAccessToken: () => null,
    });

    await createOrg(adaptor, { orgName });
  });

  afterAll(async () => {
    await destroyOrg(adaptor, { orgName });
    await stopWebServer();
    nock.enableNetConnect();
  });

  describe('getOrg', () => {
    it('should pass, when request org.', async () => {
      const publicRequester = new PublicRequester(adaptor);
      const response = await publicRequester.getOrg(orgName);

      expect(response.data.value).toMatchObject({
        label: expect.any(String),
        name: orgName,
      });
    });
  });
});
