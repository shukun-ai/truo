import { AxiosAdaptor, IRequestAdaptor, PublicRequester } from '@shukun/api';
import nock from 'nock';

import { WebServer } from '../../src/app';
import { createOrg, destroyOrg } from '../hooks/seed';

describe('PublicRequester', () => {
  const orgName = 'test_source';
  let webServer: WebServer;
  let adaptor: IRequestAdaptor;

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
      onAccessToken: () => null,
    });

    await createOrg(adaptor, { orgName });
  });

  afterAll(async () => {
    await destroyOrg(adaptor, { orgName });
    await webServer.stop();
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
