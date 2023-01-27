import { AxiosAdaptor, IRequestAdaptor, SourceRequester } from '@shukun/api';
import { AuthenticationToken } from '@shukun/schema';
import { isDateTimeIso } from '@shukun/validator';
import nock from 'nock';

import { initializeWebServer, stopWebServer } from '../../src/app';
import { createOrg, destroyOrg, updateCodebase } from '../hooks/seed';
import { signIn } from '../hooks/sign-in';

import fieldsMockData from './fields.mock.json';

describe('Source apis', () => {
  const orgName = 'test_source';
  let adaptor: IRequestAdaptor;
  let auth: AuthenticationToken | undefined;

  beforeAll(async () => {
    const apiConnection = await initializeWebServer();

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
    await stopWebServer();
    nock.enableNetConnect();
  });

  describe('metadata', () => {
    it('When query all devices, then return all devices.', async () => {
      const sourceRequester = new SourceRequester(adaptor, 'atom_a');
      const response = await sourceRequester.metadata();
      expect(response.data.value).toEqual(fieldsMockData.metadata[0]);
    });

    it.todo('should remove security fields, when get metadata.');
  });

  describe('create', () => {
    it('should return new id, when create', async () => {
      const requester = new SourceRequester(adaptor, 'atom_a');
      const response = await requester.create({
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
      expect(typeof response.data.value._id).toBe('string');
      expect(response.data.value._id.length).toBe(24);
    });

    it.todo(
      'should throw error, when some field is required, unique and index and get expected exception message.',
    );

    it.todo('should throw error, when create data for manyToMany field.');

    it.todo('should throw error, when text is too long.');

    it.todo('should get shorten integer, when float is too long.');

    it.todo('should get shorten float, when float is too long.');

    it.todo('should throw error, when password is not match rule.');
  });

  describe('query', () => {
    it('When query all devices, then return all devices.', async () => {
      const requester = new SourceRequester(adaptor, 'atom_a');
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

    it.todo('should result with $or operator.');

    it.todo('should result with $foreign operator.');

    it.todo('should result with $like operator.');

    it.todo('should result with $boolean operator.');

    it.todo('should result with select.');

    it.todo('should result with order.');
  });
});
