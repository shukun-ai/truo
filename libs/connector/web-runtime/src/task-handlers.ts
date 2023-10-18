import {
  handleEitherTask,
  handleParallelTask,
  handleRepeatTask,
  handleTransformerTask,
  HandlerInjector,
} from '@shukun/connector/handler';

export const taskHandlers: HandlerInjector['taskHandlers'] = {
  transformer: handleTransformerTask,
  parallel: handleParallelTask,
  repeat: handleRepeatTask,
  either: handleEitherTask,
};
