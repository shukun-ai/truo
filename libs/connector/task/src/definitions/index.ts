import { TaskSchema } from '@shukun/schema';

import choiceTaskJson from './choice.task.json';
import parallelTaskJson from './parallel.task.json';
import repeatTaskJson from './repeat.task.json';
import transformerTaskJson from './transformer.task.json';

export const choiceTask = choiceTaskJson as TaskSchema;
export const parallelTask = parallelTaskJson as TaskSchema;
export const repeatTask = repeatTaskJson as TaskSchema;
export const transformerTask = transformerTaskJson as TaskSchema;
