import {
  handleEitherTask,
  handleParallelTask,
  handleRepeatTask,
  handleTransformerTask,
  HandlerInjector,
} from '@shukun/connector/handler';

import { handleResourceTask } from './tasks/handle-resource-task';
import { handleShukunTask } from './tasks/handle-shukun-task';

export const taskHandlers: HandlerInjector['taskHandlers'] = {
  transformer: handleTransformerTask,
  parallel: handleParallelTask,
  repeat: handleRepeatTask,
  either: handleEitherTask,
  sourceQuery: handleShukunTask,
  default: handleResourceTask,
};
