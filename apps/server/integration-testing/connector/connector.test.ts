import {
  AxiosAdaptor,
  ConnectorRequester,
  DeveloperRequester,
  IRequestAdaptor,
  SourceRequester,
} from '@shukun/api';
import {
  AuthenticationToken,
  ConnectorSchema,
  TaskSchema,
} from '@shukun/schema';
import nock from 'nock';

import { WebServer } from '../../src/app';
import { createOrg, destroyOrg, updateCodebase } from '../hooks/seed';
import { signIn } from '../hooks/sign-in';

import applicationMockJson from './application.mock.json';
import connectorSourceMockJson from './connector-source.mock.json';

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

    const baseUrl = `http://127.0.0.1:${apiConnection.port}/apis/v1`;

    adaptor = new AxiosAdaptor({
      baseUrl,
      timeout: 10 * 1000,
      retries: 1,
      onOrgName: () => orgName,
      onAccessToken: () => auth?.accessToken ?? null,
    });

    await createOrg(adaptor, { orgName });
    auth = await signIn(adaptor, { orgName });

    await updateCodebase(adaptor, applicationMockJson);

    const developerRequester = new DeveloperRequester(adaptor);
    await updateConnector(
      developerRequester,
      'real_world',
      connectorSourceMockJson,
    );

    const sourceQueryTask: TaskSchema = {
      $schema: '../../../../schema/src/json-schemas/task.schema.json',
      scope: 'internal',
      address: baseUrl,
      parameters: {
        atomName: {
          schema: {
            type: 'string',
          },
          required: true,
          editorType: 'atomName',
        },
        query: {
          schema: {},
          required: true,
          editorType: 'sourceQuery',
        },
      },
    };

    await developerRequester.upsertTask('sourceQuery', sourceQueryTask);
  });

  afterAll(async () => {
    await destroyOrg(adaptor, { orgName });
    await webServer.stop();
    nock.enableNetConnect();
  });

  describe('connectorSource', () => {
    it('should pass', async () => {
      const sourceRequester = new SourceRequester(adaptor, 'airports');
      try {
        await sourceRequester.create({
          code: 'PVG',
        });
      } catch (error) {
        console.error(error);
      }

      const connectorRequester = new ConnectorRequester(adaptor);
      const response = await connectorRequester.runConnector('real_world', {
        code: 'PVG',
      });
      expect((response.data.value as any)[0].code).toEqual('PVG');
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
    await requester.createConnector(connectorName, connector);
  } else {
    await requester.updateConnector(connectorName, connector);
  }
};
