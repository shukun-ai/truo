import { viewRequester } from '../../apis/requester';

import { viewsStore } from './store';

class ViewService {
  async fetch() {
    const response = await viewRequester.getViews();

    viewsStore.set(response.data.value);
  }

  setActive(name: string | null) {
    viewsStore.setActive(name);
  }
}

export const viewService = new ViewService();
