import { Readable } from 'node:stream';

import { faker } from '@faker-js/faker';
import {
  DeveloperRequester,
  IRequestAdaptor,
  PublicRequester,
  TenantRequester,
} from '@shukun/api';
import { DataSourceSchema } from '@shukun/schema';
import FormData from 'form-data';

export const hasOrCreateOrg = async (
  adaptor: IRequestAdaptor,
  payload: { orgName: string },
) => {
  if (await hasOrg(adaptor, payload)) {
    return;
  }

  await createOrg(adaptor, payload);
};

export const hasOrg = async (
  adaptor: IRequestAdaptor,
  payload: { orgName: string },
) => {
  const requester = new PublicRequester(adaptor);
  try {
    await requester.getOrg(payload.orgName);
    return true;
  } catch (error) {
    return false;
  }
};

export const createOrg = async (
  adaptor: IRequestAdaptor,
  payload: { orgName: string },
) => {
  const requester = new TenantRequester(adaptor);

  await requester.createOrg({
    name: payload.orgName,
    label: faker.company.name(),
    username: 'admin',
    password: '123456',
    dbUri: 'mongodb://localhost:20000/shukun_test_project',
    dbPrefix: `org_${payload.orgName}_`,
  });
};

export const destroyOrg = async (
  adaptor: IRequestAdaptor,
  payload: { orgName: string },
) => {
  const requester = new TenantRequester(adaptor);
  await requester.destroyOrg(payload.orgName);
};

export const updateCodebase = async (
  adaptor: IRequestAdaptor,
  lowCode: unknown,
) => {
  const developerRequester = new DeveloperRequester(adaptor);
  const formData = convertJsonToFormData(lowCode);
  await developerRequester.updateCodebase(
    formData as any,
    formData.getHeaders(),
  );
};

export const updateDataSource = async (
  adaptor: IRequestAdaptor,
  dataSource: DataSourceSchema,
) => {
  const developerRequester = new DeveloperRequester(adaptor);
  await developerRequester.updateDataSource(dataSource);
};

/**
 * @see {@link https://maximorlov.com/send-a-file-with-axios-in-nodejs/}
 * How to upload file with Axios in Node.
 *
 * @see {@link https://stackoverflow.com/questions/54423322/how-to-pass-string-as-a-read-stream-object-in-nodejs}
 * How to create Stream from JSON.
 */
const convertJsonToFormData = (lowCode: unknown): FormData => {
  const json = JSON.stringify(lowCode);
  const stream = Readable.from(json);
  const formData = new FormData();
  formData.append('file', stream, 'application.json');
  return formData;
};
