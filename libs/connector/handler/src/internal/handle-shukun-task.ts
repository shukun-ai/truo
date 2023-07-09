import { AxiosAdaptor, IRequestAdaptor, SourceRequester } from '@shukun/api';
import { TypeException } from '@shukun/exception';
import { ConnectorTask } from '@shukun/schema';

import { HandlerContext } from '../types';

export const handleShukunTask = async (
  task: ConnectorTask,
  context: HandlerContext,
): Promise<HandlerContext> => {
  switch (task.type) {
    case 'source-query':
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

  const requester = new SourceRequester(createAdaptor(context), atomName);
  const response = await requester.query(query);

  return {
    ...context,
    next: task.next,
    input: response.data,
  };
};

const createAdaptor = (context: HandlerContext): IRequestAdaptor => {
  const port = process.env.PORT ?? '3000';
  const adaptor = new AxiosAdaptor({
    baseUrl: `http://127.0.0.1:${port}/apis/v1`,
    onOrgName: () => context.orgName,
    onAccessToken: () => context.accessToken ?? null,
  });
  return adaptor;
};
