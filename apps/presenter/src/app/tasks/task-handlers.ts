import {
  handleEitherTask,
  handleTransformerTask,
  HandlerInjector,
} from '@shukun/connector/handler';

import { handleAssignTask } from './handle-assign-task';
import { handleMessageTask } from './handle-message-task';

export const taskHandlers: HandlerInjector['taskHandlers'] = {
  transformer: handleTransformerTask,
  either: handleEitherTask,
  message: handleMessageTask,
  assign: handleAssignTask,
  // RunConnector
  // RunSource
  // Raise exception
  // Destination (navigation)
  // Download
};
