import {
  AxiosAdaptor,
  ConnectorRequester,
  DeveloperRequester,
  IRequestAdaptor,
} from '@shukun/api';
import { AuthenticationToken, ConnectorSchema } from '@shukun/schema';
import nock from 'nock';

import { WebServer } from '../../src/app';
import { createOrg, destroyOrg } from '../hooks/seed';
import { signIn } from '../hooks/sign-in';

import choiceMockJson from './connector-choice.mock.json';
import repeatMockJson from './connector-repeat.mock.json';
import transformerMockJson from './connector-transformer.mock.json';

describe('Connector API', () => {
  const orgName = 'connector_mock_org';
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

    const developerRequester = new DeveloperRequester(adaptor);
    updateConnector(developerRequester, 'transformer', transformerMockJson);
    updateConnector(developerRequester, 'choice', choiceMockJson);
    updateConnector(developerRequester, 'repeat', repeatMockJson);
  });

  afterAll(async () => {
    await destroyOrg(adaptor, { orgName });
    await webServer.stop();
    nock.enableNetConnect();
  });

  describe('Transformer', () => {
    it('should pass, when run transformer connector.', async () => {
      const connectorRequester = new ConnectorRequester(adaptor);
      const response = await connectorRequester.runConnector('transformer', {
        number: 1000,
      });
      expect(response.data).toEqual({
        count: 1100,
      });
    });
  });

  describe('Choice', () => {
    it('should return English, when run EN.', async () => {
      const connectorRequester = new ConnectorRequester(adaptor);
      const response = await connectorRequester.runConnector('choice', {
        language: 'EN',
      });
      expect(response.data).toEqual({
        language: 'English',
      });
    });

    it('should return Chinese, when run CN.', async () => {
      const connectorRequester = new ConnectorRequester(adaptor);
      const response = await connectorRequester.runConnector('choice', {
        language: 'CN',
      });
      expect(response.data).toEqual({
        language: 'Chinese',
      });
    });

    it('should return Default, when run FR.', async () => {
      const connectorRequester = new ConnectorRequester(adaptor);
      const response = await connectorRequester.runConnector('choice', {
        language: 'FR',
      });
      expect(response.data).toEqual({
        language: 'Default',
      });
    });
  });
});

const updateConnector = async (
  requester: DeveloperRequester,
  connectorName: string,
  connector: ConnectorSchema,
) => {
  let response;
  try {
    response = await requester.getConnector(connectorName);
  } catch (error) {
    //
  }
  if (!response) {
    requester.createConnector(connectorName, connector);
  } else {
    requester.updateConnector(connectorName, connector);
  }
};
