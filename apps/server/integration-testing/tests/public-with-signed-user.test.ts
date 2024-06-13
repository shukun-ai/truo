import { AxiosAdaptor, IRequestAdaptor, PublicRequester } from '@shukun/api';
import { AuthenticationToken } from '@shukun/schema';
import nock from 'nock';

import { WebServer } from '../../src/app';
import { createOrg, destroyOrg, updateCodebase } from '../hooks/seed';
import { signIn } from '../hooks/sign-in';

import mockApplication from './source-create.mock.json';

describe('PublicRequester', () => {
  const orgName = 'public_with_signed_user';
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

  describe('getGrantRoles', () => {
    it('should pass, when getGrantRoles.', async () => {
      const publicRequester = new PublicRequester(adaptor);
      const response = await publicRequester.getProfile(orgName);

      expect(response.data.value?.username).toEqual('admin');
      expect(typeof response.data.value?.userId).toEqual('string');
      expect(response.data.value?.orgName).toEqual('public_with_signed_user');
      expect(response.data.value?.displayName).toEqual('admin');
      expect(response.data.value?.avatar).toEqual([]);
    });
  });
});
