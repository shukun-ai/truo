import { FlowUIStore } from './store';

export class FlowUICommand {
  constructor(private readonly store: FlowUIStore) {}

  openInsertModal() {
    this.store.update(() => ({ insertModalVisible: true }));
  }

  closeInsertModal() {
    this.store.update(() => ({ insertModalVisible: false }));
  }

  openCodeModal() {
    this.store.update(() => ({ codeModalVisible: true }));
  }

  closeCodeModal() {
    this.store.update(() => ({ codeModalVisible: false }));
  }
}
