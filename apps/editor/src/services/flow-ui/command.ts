import { FlowUIStore } from './store';

export class FlowUICommand {
  constructor(private readonly store: FlowUIStore) {}

  openInsertModal() {
    this.store.update(() => ({ insertModalVisible: true }));
  }

  closeInsertModal() {
    this.store.update(() => ({ insertModalVisible: false }));
  }
}
