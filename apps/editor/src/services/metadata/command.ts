import { MetadataSchema } from '@shukun/schema';

import { MetadataStore } from './store';

export class MetadataCommand {
  constructor(private readonly store: MetadataStore) {}

  setAll(metadata: Record<string, MetadataSchema>) {
    this.store.set({ ids: Object.keys(metadata), entities: metadata });
  }
}
