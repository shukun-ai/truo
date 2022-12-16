import { FlowSchema } from '@shukun/schema';

import { FlowStore } from './store';

export class FlowCommand {
  constructor(private readonly store: FlowStore) {}

  setAll(flows: Record<string, FlowSchema>) {
    this.store.set({ ids: Object.keys(flows), entities: flows });
  }
}
