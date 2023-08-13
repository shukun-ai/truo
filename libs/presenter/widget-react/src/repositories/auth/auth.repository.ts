import { Repository } from '@shukun/presenter/definition';

export const authRepository: Repository = {
  signOut: (payload, event, injector) => {
    injector.auth.signOut();
  },
};
