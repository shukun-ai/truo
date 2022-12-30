import { FlowUICommand } from './command';
import { FlowUIQuery } from './query';
import { FlowUIStore } from './store';

const flowUIStore = new FlowUIStore();

export const flowUIQuery = new FlowUIQuery(flowUIStore);
export const flowUICommand = new FlowUICommand(flowUIStore);
