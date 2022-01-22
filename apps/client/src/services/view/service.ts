import { findAllViews } from '../../models/view';

import { viewsStore } from './store';

class ViewService {
  async fetch() {
    const response = await findAllViews();
    viewsStore.set(response.data.value);
  }

  setActive(name: string | null) {
    viewsStore.setActive(name);
  }
}

export const viewService = new ViewService();
