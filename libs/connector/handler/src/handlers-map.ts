import { handleEitherTask } from './internal/handle-either-task';
import { handleParallelTask } from './internal/handle-parallel-task';
import { handleRepeatTask } from './internal/handle-repeat.task';
import { handleResourceTask } from './internal/handle-resource-task';
import { handleShukunTask } from './internal/handle-shukun-task';
import { handleTransformerTask } from './internal/handle-transformer-task';
import { HandlerInjector } from './types';

export const taskHandlers: HandlerInjector['taskHandlers'] = {
  transformer: handleTransformerTask,
  parallel: handleParallelTask,
  repeat: handleRepeatTask,
  either: handleEitherTask,
  sourceQuery: handleShukunTask,
  default: handleResourceTask,
};
