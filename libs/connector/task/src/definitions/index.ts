import { TaskSchema } from '@shukun/schema';

import eitherTaskJson from './either.task.json';
import parallelTaskJson from './parallel.task.json';
import repeatTaskJson from './repeat.task.json';
import sourceQueryTaskJson from './source-query.task.json';
import transformerTaskJson from './transformer.task.json';

export const eitherTask = eitherTaskJson as TaskSchema;
export const parallelTask = parallelTaskJson as TaskSchema;
export const repeatTask = repeatTaskJson as TaskSchema;
export const transformerTask = transformerTaskJson as TaskSchema;
export const sourceQueryTask = sourceQueryTaskJson as TaskSchema;
