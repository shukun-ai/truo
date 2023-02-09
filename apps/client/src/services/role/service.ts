import { publicRequester } from '../../apis/requester';

import { roleStore } from './store';

class RoleService {
  async fetch() {
    const response = await publicRequester.getRoles();
    roleStore.set(response.data.value);
  }

  reset() {
    roleStore.reset();
  }
}

export const roleService = new RoleService();
