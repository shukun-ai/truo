import { FlowCommand } from './command';
import { FlowCommandHelper } from './commands/command-helper';
import { FlowCommandInsert } from './commands/command-insert';
import { FlowQuery } from './query';
import { FlowStore } from './store';

const flowStore = new FlowStore();
const flowCommandHelper = new FlowCommandHelper();
const flowCommandInsert = new FlowCommandInsert(flowCommandHelper);

export const flowQuery = new FlowQuery(flowStore);
export const flowCommand = new FlowCommand(flowStore, flowCommandInsert);
