import { AxiosAdaptor, IRequestAdaptor, SourceRequester } from '@shukun/api';
import { AuthenticationToken } from '@shukun/schema';
import nock from 'nock';

import { initializeWebServer, stopWebServer } from '../../src/app';
import { createOrg, destroyOrg, updateCodebase } from '../hooks/seed';
import { signIn } from '../hooks/sign-in';

import mockApplication from './response-exceptions.mock.json';

describe('Source apis', () => {
  const orgName = 'test_source';
  let adaptor: IRequestAdaptor;
  let auth: AuthenticationToken | undefined;

  beforeAll(async () => {
    const apiConnection = await initializeWebServer({ ci: true });

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
    await stopWebServer();
    nock.enableNetConnect();
  });

  describe('Make wrong request.', () => {
    it('should throw error, when make a 400 bad request.', async () => {
      const sourceRequester = new SourceRequester(adaptor, 'devices');
      try {
        await sourceRequester.create({
          title: 'title',
          type: 'vehicle',
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        expect(error.status).toEqual(400);
        expect(error.message).toEqual('NO.: should not be empty.');
        expect(error.interpolationMap).toEqual(undefined);
        // TODO should return Bad Request, not Unknown.
        expect(error.internalServerCode).toEqual('Unknown');
      }
    });

    it.todo('should throw error, when make a duplication value input.');

    it.todo('should throw error, when make a 403 authorization.');
  });
});
