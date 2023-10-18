import { HandlerContext } from '@shukun/connector/handler';
import { TypeException } from '@shukun/exception';
import { ConnectorTask } from '@shukun/schema';

export type MessageParameters = {
  message: string;
};

export const handleMessageTask = async (
  task: ConnectorTask,
  context: HandlerContext,
): Promise<HandlerContext> => {
  const { message } = task.parameters as MessageParameters;

  if (window?.alert) {
    window.alert(message);
  } else {
    throw new TypeException('The runtime is not support window.alert');
  }

  return {
    ...context,
    next: task.next,
  };
};
