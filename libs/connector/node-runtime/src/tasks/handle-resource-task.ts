import { IRequestAdaptor } from '@shukun/api';
import {
  getDefinition,
  HandlerContext,
  HandlerInjector,
} from '@shukun/connector/handler';
import { ConnectorTask } from '@shukun/schema';

import { createRequesterAdaptor } from './requester-adaptor';

export const handleResourceTask = async (
  task: ConnectorTask,
  context: HandlerContext,
  injector: HandlerInjector,
): Promise<HandlerContext> => {
  const adaptor = createAdaptor(task, context, injector);

  const response = await adaptor.fetch<{ value: unknown }>('POST', '', {
    body: task.parameters,
  });

  return {
    ...context,
    next: task.next,
    input: response.data.value,
  };
};

const createAdaptor = (
  task: ConnectorTask,
  context: HandlerContext,
  injector: HandlerInjector,
): IRequestAdaptor => {
  const definition = getDefinition(task, injector.taskDefinitions);

  // @remark if the address and defaultAddress is not defined, will throw error
  // It will help us to recognize what task definition is not defined address.
  const defaultAddress = '';

  return createRequesterAdaptor({
    orgName: context.orgName,
    protocol: definition.protocol,
    address: definition.address,
    defaultAddress,
    withAccessToken: definition.withAccessToken,
    accessToken: context.accessToken,
  });
};
