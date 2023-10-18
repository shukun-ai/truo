import {
  handleEitherTask,
  handleParallelTask,
  handleRepeatTask,
  handleTransformerTask,
  HandlerInjector,
} from '@shukun/connector/handler';

import { handleMessageTask } from './handle-message-task';

export const taskHandlers: HandlerInjector['taskHandlers'] = {
  transformer: handleTransformerTask,
  parallel: handleParallelTask,
  repeat: handleRepeatTask,
  either: handleEitherTask,
  message: handleMessageTask,
};
