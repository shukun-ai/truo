import { findAllRoles } from '../../models/role';

import { roleStore } from './store';

class RoleService {
  async fetch() {
    const response = await findAllRoles();
    roleStore.set(response.data.value);
  }

  reset() {
    roleStore.reset();
  }
}

export const roleService = new RoleService();
