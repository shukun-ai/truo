import { TaskSchema } from '@shukun/schema';

import assignTaskJson from './assign.task.json';
import eitherTaskJson from './either.task.json';
import messageTaskJson from './message.task.json';
import parallelTaskJson from './parallel.task.json';
import repeatTaskJson from './repeat.task.json';
import sourceQueryTaskJson from './source-query.task.json';
import transformerTaskJson from './transformer.task.json';

// Shared
export const eitherTask = eitherTaskJson as TaskSchema;
export const parallelTask = parallelTaskJson as TaskSchema;
export const repeatTask = repeatTaskJson as TaskSchema;
export const transformerTask = transformerTaskJson as TaskSchema;

// Web
export const messageTask = messageTaskJson as TaskSchema;
export const assignTask = assignTaskJson as TaskSchema;
// > RunConnector
// > RunSource
// > Raise exception
// > Destination (navigation)
// > Download

// Node
export const sourceQueryTask = sourceQueryTaskJson as TaskSchema;
