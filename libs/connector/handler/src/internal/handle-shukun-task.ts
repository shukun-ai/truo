import { AxiosAdaptor, IRequestAdaptor, SourceRequester } from '@shukun/api';
import { TypeException } from '@shukun/exception';
import { ConnectorTask } from '@shukun/schema';

import { HandlerContext } from '../types';

export const handleShukunTask = async (
  task: ConnectorTask,
  context: HandlerContext,
): Promise<HandlerContext> => {
  switch (task.type) {
    case 'sourceQuery':
      return await handleSourceQueryTask(task, context);
    default:
      throw new TypeException('This type is not supported by shukun task.');
  }
};

const handleSourceQueryTask = async (
  task: ConnectorTask,
  context: HandlerContext,
): Promise<HandlerContext> => {
  const { atomName, query } = task.parameters as any;

  const requester = new SourceRequester(createAdaptor(task, context), atomName);
  const response = await requester.query(query);

  return {
    ...context,
    next: task.next,
    input: response.data,
  };
};

const createAdaptor = (
  task: ConnectorTask,
  context: HandlerContext,
): IRequestAdaptor => {
  const definition = context.taskDefinitions[task.type];

  if (!definition) {
    throw new TypeException('Did not find task definition.');
  }

  const { address } = definition as { address?: string };

  const baseUrl = address
    ? address
    : `http://127.0.0.1:${process.env.PORT ?? '3000'}/apis/v1`;

  const adaptor = new AxiosAdaptor({
    baseUrl,
    onOrgName: () => context.orgName,
    onAccessToken: () => context.accessToken ?? null,
  });
  return adaptor;
};
