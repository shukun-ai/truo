import { AxiosAdaptor, IRequestAdaptor, SourceRequester } from '@shukun/api';
import nock from 'nock';

import { initializeWebServer, stopWebServer } from '../../src/app';
import { createOrg, destroyOrg, updateCodebase } from '../hooks/seed';
import { signIn } from '../hooks/sign-in';
describe('Source apis', () => {
  const orgName = 'test_source';
  let adaptor: IRequestAdaptor;
  let accessToken: string;

  beforeAll(async () => {
    jest.setTimeout(20 * 1000);

    const apiConnection = await initializeWebServer();

    nock.disableNetConnect();
    nock.enableNetConnect('127.0.0.1');

    adaptor = new AxiosAdaptor({
      baseUrl: `http://127.0.0.1:${apiConnection.port}/apis/v1`,
      timeout: 10 * 1000,
      retries: 1,
      debug: true,
      onOrgName: () => orgName,
      onAccessToken: () => accessToken,
    });

    await createOrg(adaptor, { orgName });
    const auth = await signIn(adaptor, { orgName });
    accessToken = auth.accessToken;

    await updateCodebase(adaptor);
  });

  afterAll(async () => {
    await destroyOrg(adaptor, { orgName });
    await stopWebServer();
    nock.enableNetConnect();
  });

  describe('metadata', () => {
    it('When query all devices, then return all devices.', async () => {
      const sourceRequester = new SourceRequester(adaptor, 'devices');
      const response = await sourceRequester.metadata();
      expect(response.data.value).toEqual({
        name: 'devices',
        label: 'Devices',
        electrons: [
          {
            name: 'number',
            label: 'NO.',
            fieldType: 'Text',
            isRequired: true,
            isUnique: true,
          },
          {
            name: 'title',
            label: 'Title',
            fieldType: 'Text',
            isRequired: true,
          },
          {
            name: 'type',
            label: 'Type',
            fieldType: 'SingleSelect',
            isRequired: true,
            options: [
              {
                key: 'vehicle',
                label: 'Vehicle Pad',
              },
              {
                key: 'delivery',
                label: 'Delivery PDA',
              },
              {
                key: 'ticket',
                label: 'Ticket PDA',
              },
            ],
          },
        ],
      });
    });
  });

  describe.skip('query', () => {
    it('When query all devices, then return all devices.', () => {
      const output = '';
      expect(output).toEqual({});
    });
  });
});
