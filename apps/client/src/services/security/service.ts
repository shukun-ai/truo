import { findGrantList, findGrantRoles } from '../../models/security';

import { securityStore } from './store';

export class SecurityService {
  async fetchGrantList() {
    const response = await findGrantList();

    securityStore.update(() => ({
      grantList: response.data.value,
    }));
  }

  async fetchGrantRoles() {
    const response = await findGrantRoles();

    securityStore.update(() => ({
      grantRoles: response.data.value,
    }));
  }
}

export const securityService = new SecurityService();
