import { IRequestAdaptor, PublicRequester } from '@shukun/api';

export const signIn = async (
  adaptor: IRequestAdaptor,
  payload: { orgName: string },
) => {
  const requester = new PublicRequester(adaptor);

  const response = await requester.signIn(payload.orgName, {
    username: 'admin',
    password: '123456',
  });

  return response.data.value;
};
