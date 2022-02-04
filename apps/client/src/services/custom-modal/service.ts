import { MetadataSchema, ViewSchema } from '@shukun/schema';
import { UnknownSourceModel } from '../../models/source';
import { SearchModel } from '../search';
import { CustomModalStore } from './store';

export class CustomModalService {
  constructor(private customModalStore: CustomModalStore) {}

  openModal(
    label: string,
    url: string,
    search?: SearchModel,
    sources?: UnknownSourceModel[],
    view?: ViewSchema,
    metadata?: MetadataSchema,
  ) {
    this.customModalStore.update(() => ({
      label,
      url,
      visible: true,
      search,
      sources,
      view,
      metadata,
    }));
  }

  closeModal() {
    this.customModalStore.reset();
  }
}
