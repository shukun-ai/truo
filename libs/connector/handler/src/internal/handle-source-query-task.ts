import { AxiosAdaptor, SourceRequester } from '@shukun/api';
import { ConnectorTask } from '@shukun/schema';

import { HandlerContext } from '../types';

export const handleSourceQueryTask = async (
  task: ConnectorTask,
  context: HandlerContext,
): Promise<HandlerContext> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { atomName, query } = task.parameters as any;

  const port = process.env.PORT ?? '3000';
  const adaptor = new AxiosAdaptor({
    baseUrl: `http://127.0.0.1:${port}/apis/v1`,
    onOrgName: () => context.orgName,
    onAccessToken: () => context.accessToken ?? null,
  });

  const requester = new SourceRequester(adaptor, atomName);
  const response = await requester.query(query);

  return {
    ...context,
    next: task.next,
    input: response.data,
  };
};
