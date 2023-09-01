import { Repository } from '@shukun/presenter/definition';

export const temporaryRepository: Repository = {
  setValue(payload, event, injector, repository): void {
    const { path } = event;
    const fullPath = path ? [event.target].concat(path) : [event.target];
    injector.store.update<any>(fullPath, () => payload);
  },
};
