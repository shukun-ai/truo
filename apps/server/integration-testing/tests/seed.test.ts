import { faker } from '@faker-js/faker';
import { AxiosAdaptor, TenantRequester } from '@shukun/api';

describe('seed', () => {
  const adaptor = new AxiosAdaptor({
    baseUrl: `http://localhost:3000/apis/v1`,
    timeout: 10 * 1000,
    retries: 1,
    debug: true,
    onOrgName: () => null,
    onAccessToken: () => null,
  });

  describe('createOrg', () => {
    it('When create org, then return null.', async () => {
      const requester = new TenantRequester(adaptor);

      const output = await requester.createOrg({
        name: faker.lorem.word(),
        label: faker.company.name(),
        username: 'admin',
        password: '123456',
      });

      expect(output).toEqual({ data: { value: null } });
    });
  });
});
