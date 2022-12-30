import { FlowCommand } from './command';
import { FlowQuery } from './query';
import { FlowStore } from './store';

const flowStore = new FlowStore();

export const flowQuery = new FlowQuery(flowStore);
export const flowCommand = new FlowCommand(flowStore);
