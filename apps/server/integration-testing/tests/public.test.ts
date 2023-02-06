import {
  ApiResponseException,
  AxiosAdaptor,
  IRequestAdaptor,
  PublicRequester,
} from '@shukun/api';
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

  describe('signIn', () => {
    it('should pass, when signIn.', async () => {
      const publicRequester = new PublicRequester(adaptor);
      const response = await publicRequester.signIn(orgName, {
        username: 'admin',
        password: '123456',
      });

      expect(response.data.value).toEqual({
        userId: expect.any(String),
        username: 'admin',
        orgName,
        orgId: expect.any(String),
        tokenType: 'jwt',
        accessToken: expect.any(String),
        expiresIn: 36000000,
      });
    });
  });

  describe('validateAuthorization', () => {
    it('should return true, when validate authorization of public without token.', async () => {
      const publicRequester = new PublicRequester(adaptor);
      const response = await publicRequester.validateAuthorization(
        'POST',
        '/apis/v1/public/any/org',
      );

      expect(response.data.value).toEqual(true);
    });

    it('should throw error, when validate authorization of source without token.', async () => {
      const publicRequester = new PublicRequester(adaptor);

      try {
        await publicRequester.validateAuthorization(
          'POST',
          '/apis/v1/source/test/devices',
        );
      } catch (error) {
        expect(error).toEqual(
          new ApiResponseException(
            401,
            '未登录无法访问该资源。',
            undefined,
            'GatewayUnauthorizedException',
          ),
        );
      }
    });
  });

  describe('getGrantList', () => {
    it('should pass, when getGrantList.', async () => {
      const publicRequester = new PublicRequester(adaptor);
      const response = await publicRequester.getGrantList(orgName);

      expect(response.data.value).toEqual([
        { label: '所有者角色', name: 'owner', permissions: [] },
        { label: '未登录角色', name: 'anonymous', permissions: [] },
      ]);
    });
  });

  describe('getGrantRoles', () => {
    it('should pass, when getGrantRoles.', async () => {
      const publicRequester = new PublicRequester(adaptor);
      const response = await publicRequester.getGrantRoles(orgName);

      expect(response.data.value).toEqual(['anonymous']);
    });
  });

  describe('getRoles', () => {
    it('should pass, when getRoles.', async () => {
      const publicRequester = new PublicRequester(adaptor);
      const response = await publicRequester.getRoles(orgName);

      expect(response.data.value).toEqual([
        { label: '所有者角色', name: 'owner' },
        { label: '未登录角色', name: 'anonymous' },
      ]);
    });
  });
});
