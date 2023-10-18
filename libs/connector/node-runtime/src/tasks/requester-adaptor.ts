import { AxiosAdaptor, IRequestAdaptor } from '@shukun/api';
import { TypeException } from '@shukun/exception';

export const createRequesterAdaptor = (
  context: AdaptorContext,
): IRequestAdaptor => {
  const adaptor = new AxiosAdaptor({
    baseUrl: createBaseUrl(context),
    onOrgName: () => context.orgName,
    onAccessToken: () =>
      context.withAccessToken ? getAccessToken(context) : null,
  });
  return adaptor;
};

const createBaseUrl = ({ address, defaultAddress }: AdaptorContext) => {
  const baseUrl = address ? address : defaultAddress;
  if (!baseUrl) {
    throw new TypeException('The address and defaultAddress are empty.');
  }
  return baseUrl;
};

const getAccessToken = (context: AdaptorContext) => {
  return context.accessToken ?? null;
};

type AdaptorContext = {
  orgName: string;
  protocol?: string;
  address?: string;
  defaultAddress?: string;
  withAccessToken?: boolean;
  accessToken?: string;
};
