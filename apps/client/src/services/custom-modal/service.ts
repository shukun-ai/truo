import { UnknownSourceModel } from '../../models/source';
import { CustomModalStore } from './store';

export class CustomModalService {
  constructor(private customModalStore: CustomModalStore) {}

  openModal(label: string, url: string, sources?: UnknownSourceModel[]) {
    this.customModalStore.update(() => ({
      label,
      url,
      visible: true,
      sources,
    }));
  }

  closeModal() {
    this.customModalStore.reset();
  }
}
