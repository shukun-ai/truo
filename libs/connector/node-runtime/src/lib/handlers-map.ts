import {
  handleEitherTask,
  handleParallelTask,
  handleRepeatTask,
  handleResourceTask,
  handleShukunTask,
  handleTransformerTask,
  HandlerInjector,
} from '@shukun/connector/handler';

export const taskHandlers: HandlerInjector['taskHandlers'] = {
  transformer: handleTransformerTask,
  parallel: handleParallelTask,
  repeat: handleRepeatTask,
  either: handleEitherTask,
  sourceQuery: handleShukunTask,
  default: handleResourceTask,
};
