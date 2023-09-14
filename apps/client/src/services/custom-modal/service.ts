import { PostMessageCustomModeType } from '@shukun/postmate';
import { MetadataSchema, UnknownSourceModel, ViewSchema } from '@shukun/schema';

import { SearchModel } from '../search';

import { CustomModalStore } from './store';

export class CustomModalService {
  constructor(private customModalStore: CustomModalStore) {}

  openModal(
    customMode: PostMessageCustomModeType,
    label: string,
    url: string,
    search?: SearchModel,
    sources?: UnknownSourceModel[],
    view?: ViewSchema,
    metadata?: MetadataSchema,
  ) {
    this.customModalStore.update(() => ({
      customMode,
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
