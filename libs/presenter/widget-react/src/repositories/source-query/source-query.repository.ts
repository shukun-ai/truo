import {
  Repository,
  initialAsyncState,
  setAsyncState,
  setAsyncError,
  setAsyncPending,
  setAsyncSuccess,
} from '@shukun/presenter/definition';
import { HttpQuerySchema } from '@shukun/schema';

export const sourceQueryRepository: Repository = {
  register: (payload, event, injector, repository) => {
    injector.store.update([event.target], initialAsyncState());
  },

  run: async (payload, event, injector, repository): Promise<void> => {
    injector.store.update([event.target], setAsyncState({ loading: true }));
    const atomName: string = repository.parameters.atomName as any;
    const query: HttpQuerySchema = payload as any;

    injector.store.update([event.target], setAsyncPending());

    try {
      const response = await injector.api
        .createSourceRequester(atomName)
        .query(query);
      injector.store.update([event.target], setAsyncSuccess(response.data));
    } catch (error) {
      injector.store.update([event.target], setAsyncError(error));
      injector.logger.error('sourceQueryRepository.run', error);
    }
  },
};
