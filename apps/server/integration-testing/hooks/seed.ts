import { createReadStream } from 'fs';
import { join } from 'path';

import { faker } from '@faker-js/faker';
import {
  DeveloperRequester,
  IRequestAdaptor,
  TenantRequester,
} from '@shukun/api';
import FormData from 'form-data';

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
  });
};

export const destroyOrg = async (
  adaptor: IRequestAdaptor,
  payload: { orgName: string },
) => {
  const requester = new TenantRequester(adaptor);
  await requester.destroyOrg(payload.orgName);
};

export const updateCodebase = async (adaptor: IRequestAdaptor) => {
  const developerRequester = new DeveloperRequester(adaptor);
  // formData.getHeaders();
  const formData = getJsonFormData();
  await developerRequester.updateCodebase(
    formData as any,
    formData.getHeaders(),
  );
};

/**
 * @see {@link https://maximorlov.com/send-a-file-with-axios-in-nodejs/}
 * How to upload file with Axios in Node.
 */
const getJsonFormData = () => {
  // const json = JSON.stringify(applicationMockData);
  // const blob = new Blob([json], { type: 'application/json' });
  const file = createReadStream(join(__dirname, './application.mock.json'));
  const formData = new FormData();
  formData.append('file', file, 'application.json');
  return formData;
};
