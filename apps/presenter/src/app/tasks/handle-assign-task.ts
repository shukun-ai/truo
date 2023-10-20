import { HandlerContext, HandlerInjector } from '@shukun/connector/handler';

import { ConnectorTask } from '@shukun/schema';

export type AssignParameters = {
  variable: string;
  expression: string;
};

export const handleAssignTask = async (
  task: ConnectorTask,
  context: HandlerContext,
  injector: HandlerInjector,
): Promise<HandlerContext> => {
  // const { variable, expression } = task.parameters as AssignParameters;
  // TODO update store

  return {
    ...context,
    next: task.next,
  };
};
