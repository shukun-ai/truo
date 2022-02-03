import { MetadataSchema, ViewSchema } from '@shukun/schema';
import { UnknownSourceModel } from '../../models/source';
import { CustomModalStore } from './store';

export class CustomModalService {
  constructor(private customModalStore: CustomModalStore) {}

  openModal(
    label: string,
    url: string,
    sources?: UnknownSourceModel[],
    view?: ViewSchema,
    metadata?: MetadataSchema,
  ) {
    this.customModalStore.update(() => ({
      label,
      url,
      visible: true,
      sources,
      view,
      metadata,
    }));
  }

  closeModal() {
    this.customModalStore.reset();
  }
}
