import { IRequestAdaptor, SourceRequester } from '@shukun/api';
import { TypeException } from '@shukun/exception';
import { ConnectorTask } from '@shukun/schema';

import { getDefinition } from '../helpers/get-definition';
import { createRequesterAdaptor } from '../requester/requester-adaptor';
import { HandlerContext, HandlerInjector } from '../types';

export const handleShukunTask = async (
  task: ConnectorTask,
  context: HandlerContext,
  injector: HandlerInjector,
): Promise<HandlerContext> => {
  switch (task.type) {
    case 'sourceQuery':
      return await handleSourceQueryTask(task, context, injector);
    default:
      throw new TypeException('This type is not supported by shukun task.');
  }
};

const handleSourceQueryTask = async (
  task: ConnectorTask,
  context: HandlerContext,
  injector: HandlerInjector,
): Promise<HandlerContext> => {
  const { atomName, query } = task.parameters as any;

  const requester = new SourceRequester(
    createShukunAdaptor(task, context, injector),
    atomName,
  );
  const response = await requester.query(query);

  return {
    ...context,
    next: task.next,
    input: response.data,
  };
};

const createShukunAdaptor = (
  task: ConnectorTask,
  context: HandlerContext,
  injector: HandlerInjector,
): IRequestAdaptor => {
  const definition = getDefinition(task, injector.taskDefinitions);

  const defaultAddress = `http://127.0.0.1:${
    process.env.PORT ?? '3000'
  }/apis/v1`;

  return createRequesterAdaptor({
    orgName: context.orgName,
    protocol: definition.protocol,
    address: definition.address,
    defaultAddress,
    withAccessToken: definition.withAccessToken,
    accessToken: context.accessToken,
  });
};
