import { ConnectorTask } from '@shukun/schema';

import { handleParallelTask } from './internal/handle-parallel-task';
import { handleRepeatTask } from './internal/handle-repeat.task';
import { handleShukunTask } from './internal/handle-shukun-task';
import { handleTransformerTask } from './internal/handle-transformer-task';
import { HandlerContext } from './types';

export const internalHandlerMaps: Record<
  string,
  (task: ConnectorTask, context: HandlerContext) => Promise<HandlerContext>
> = {
  transformer: handleTransformerTask,
  parallel: handleParallelTask,
  repeat: handleRepeatTask,
  sourceQuery: handleShukunTask,
};
