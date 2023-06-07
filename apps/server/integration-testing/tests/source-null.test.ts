import { AxiosAdaptor, IRequestAdaptor, SourceRequester } from '@shukun/api';
import { AuthenticationToken } from '@shukun/schema';
import nock from 'nock';

import { WebServer } from '../../src/app';
import { createOrg, destroyOrg, updateCodebase } from '../hooks/seed';
import { signIn } from '../hooks/sign-in';

import fieldsMockData from './source-null.mock.json';

describe('Source null search', () => {
  const orgName = 'default_source_null_org';
  let adaptor: IRequestAdaptor;
  let webServer: WebServer;
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
      debug: true,
      onOrgName: () => orgName,
      onAccessToken: () => auth?.accessToken ?? null,
    });

    await createOrg(adaptor, { orgName });
    auth = await signIn(adaptor, { orgName });

    await updateCodebase(adaptor, fieldsMockData);
  });

  afterAll(async () => {
    await destroyOrg(adaptor, { orgName });
    await webServer.stop();
    nock.enableNetConnect();
  });

  describe('query', () => {
    it('When search null, then return null and undefined.', async () => {
      const requester = new SourceRequester(adaptor, 'atom_a');

      await requester.create({
        key: 'first',
        text: 'has value',
      });

      await requester.create({
        key: 'second',
        text: null,
      });

      await requester.create({
        key: 'third',
      });

      const response1 = await requester.query({
        filter: { text: { $eq: null } },
      });

      const entities1 = response1.data.value;
      expect(response1.data.value.length).toBe(2);
      expect(entities1[0].text).toEqual(null);
      expect(entities1[1].text).toEqual(undefined);

      const response2 = await requester.query({
        filter: { text: { $ne: null } },
      });

      const entities2 = response2.data.value;
      expect(response2.data.value.length).toBe(1);
      expect(entities2[0].text).toEqual('has value');
    });
  });
});
