import { FlowEvent } from '@shukun/schema';

import { FlowUIStore } from './store';

export class FlowUICommand {
  constructor(private readonly store: FlowUIStore) {}

  openInsertModal() {
    this.store.update(() => ({ insertModalVisible: true }));
  }

  closeInsertModal() {
    this.store.update(() => ({ insertModalVisible: false }));
  }

  insertEditingForm(eventName: string, eventType: FlowEvent['type']) {
    this.store.update(() => ({
      editingMode: 'create',
      editingEventName: eventName,
      editingEvent: {
        type: eventType,
      },
    }));
  }

  closeEditingForm() {
    this.store.update(() => ({
      editingMode: 'create',
      editingEventName: null,
      editingEvent: null,
    }));
  }
}
