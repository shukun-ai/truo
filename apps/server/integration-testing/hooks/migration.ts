import { DeveloperRequester, IRequestAdaptor } from '@shukun/api';

export const executeMigration = async (adaptor: IRequestAdaptor) => {
  const developerRequester = new DeveloperRequester(adaptor);
  await developerRequester.executeMigration();
};
