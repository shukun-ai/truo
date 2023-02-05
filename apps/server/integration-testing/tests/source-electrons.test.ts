import { faker } from '@faker-js/faker';
import { AxiosAdaptor, IRequestAdaptor, SourceRequester } from '@shukun/api';
import { AuthenticationToken } from '@shukun/schema';
import { isDateTimeIso } from '@shukun/validator';
import nock from 'nock';

import { WebServer } from '../../src/app';
import { createOrg, destroyOrg, updateCodebase } from '../hooks/seed';
import { signIn } from '../hooks/sign-in';

import fieldsMockData from './source-electrons.mock.json';

describe('Source apis', () => {
  const orgName = 'default_source_electrons_org';
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

  describe('metadata', () => {
    it('When query all devices, then return all devices.', async () => {
      const sourceRequester = new SourceRequester(adaptor, 'atom_a');
      const response = await sourceRequester.metadata();
      expect(response.data.value).toEqual(fieldsMockData.metadata[0]);
    });
  });

  describe('query', () => {
    it('When query all devices, then return all devices.', async () => {
      const requester = new SourceRequester(adaptor, 'atom_a');

      await requester.create({
        text: 'text',
        nameText: 'name_text',
        largeText: 'largeText',
        singleSelect: 'test',
        multiSelect: ['test'],
        boolean: true,
        dateTime: new Date('2023-01-26T19:03:00.000Z').toISOString(),
        integer: 1,
        float: 2.00000888,
        currency: 7.9999,
        password: 123456,
        // TODO Add manyToMany test case.
        // "manyToMany": "many_to_many",
        manyToOne: '63d36c980738daff7202310b',
        // TODO we need to add add_attachment and remove_attachment method.
        attachment: [
          {
            mime: 'images/png',
            path: 'test/test.png',
            size: 2000,
            name: 'test',
          },
        ],
        mixed: { title: 'Hello World!' },
        role: ['admin'],
      });

      const response = await requester.query({
        filter: { text: { $eq: 'text' } },
      });
      const entity = response.data.value[0];
      expect(response.data.value.length).toBe(1);
      expect(typeof entity._id).toBe('string');
      expect(entity._id.length).toBe(24);
      expect(isDateTimeIso(entity.createdAt)).toBe(true);
      expect(isDateTimeIso(entity.updatedAt)).toBe(true);
      expect(entity).toEqual({
        _id: entity._id,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        text: 'text',
        nameText: 'name_text',
        largeText: 'largeText',
        singleSelect: 'test',
        multiSelect: ['test'],
        boolean: true,
        dateTime: new Date('2023-01-26T19:03:00.000Z').toISOString(),
        integer: 1,
        float: 2.00000888,
        currency: 7.9999,
        password: null,
        mixed: { title: 'Hello World!' },
        attachment: [
          {
            mime: 'images/png',
            path: 'test/test.png',
            size: 2000,
            name: 'test',
          },
        ],
        role: ['admin'],
        manyToOne: '63d36c980738daff7202310b',
        // TODO make new feature to hide manyToMany field.
        manyToMany: [],
        // TODO should let this value return.
        // owner: operatorId,
      });
    });

    it('should result with $or operator.', async () => {
      const requester = new SourceRequester(adaptor, 'atom_a');
      await requester.create({
        text: 'mock_text_1',
      });
      await requester.create({
        text: 'mock_text_2',
      });
      await requester.create({
        text: 'mock_text_3',
      });
      const response = await requester.query({
        filter: {
          $or: [{ text: { $eq: 'mock_text_1' } }, { text: 'mock_text_2' }],
        },
        count: true,
      });

      expect(response.data).toMatchObject({
        count: 2,
        value: [{ text: 'mock_text_1' }, { text: 'mock_text_2' }],
      });
    });

    it('should result with $foreign operator.', async () => {
      const bRequester = new SourceRequester(adaptor, 'atom_b');
      const b1Response = await bRequester.create({
        number: 'mock_b_number_1',
      });
      await bRequester.create({
        number: 'mock_b_number_2',
      });
      const aRequester = new SourceRequester(adaptor, 'atom_a');
      await aRequester.create({
        text: 'a',
        manyToOne: b1Response.data.value._id,
      });
      const response = await aRequester.query({
        filter: {
          manyToOne: { $foreign: { number: 'mock_b_number_1' } },
        },
        count: true,
      });

      expect(response.data).toMatchObject({
        count: 1,
        value: [{ text: 'a', manyToOne: expect.any(String) }],
      });
    });

    it('should result with $like operator.', async () => {
      const slug = faker.commerce.product();
      const text = `mock_${slug}_text_1`;
      const requester = new SourceRequester(adaptor, 'atom_a');
      await requester.create({
        text,
      });
      const response = await requester.query({
        filter: {
          text: { $like: slug },
        },
        count: true,
      });

      expect(response.data).toMatchObject({
        count: 1,
        value: [{ text }],
      });
    });

    it.todo('should result with $boolean operator.');

    it('should result with select.', async () => {
      const requester = new SourceRequester(adaptor, 'atom_a');
      const slug = faker.commerce.product();
      await requester.create({
        text: `mock_select_${slug}`,
        float: faker.commerce.price,
      });
      const response = await requester.query({
        filter: {
          text: `mock_select_${slug}`,
        },
        select: { text: true },
        count: true,
      });
      expect(response.data.value).toMatchObject([
        { _id: expect.any(String), text: `mock_select_${slug}` },
      ]);
    });
  });
});
