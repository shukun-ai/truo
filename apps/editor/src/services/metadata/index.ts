import { MetadataCommand } from './command';
import { MetadataQuery } from './query';
import { MetadataStore } from './store';

const metadataStore = new MetadataStore();
export const metadataQuery = new MetadataQuery(metadataStore);
export const metadataCommand = new MetadataCommand(metadataStore);
