import { PresenterSchema } from '@shukun/schema';

import { ApiRequester } from '../../apis/requester';

import { ISynchronizeService } from './synchronize-service.interface';

export class SynchronizeService implements ISynchronizeService {
  constructor(private readonly apiRequester: ApiRequester) {}

  async save(presenter: PresenterSchema): Promise<void> {
    const text = JSON.stringify(presenter);
    // const blob = new Blob([text], { type: 'text/plain' });
    // const file = new File([blob], 'foo.txt', { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', text);
    this.apiRequester.developerRequester.updatePresentersCode(formData);
  }
}
