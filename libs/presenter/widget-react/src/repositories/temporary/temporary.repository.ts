import { Repository } from '@shukun/presenter/definition';

export const temporaryRepository: Repository = {
  register(payload, event, injector, repository): void {
    const defaultValue = repository.parameters['defaultValue'];
    const fullPath = [event.target];
    if (defaultValue) {
      injector.store.update<any>(fullPath, () => defaultValue);
    }
  },

  setValue(payload, event, injector, repository): void {
    const { path } = event;
    const fullPath = path ? [event.target].concat(path) : [event.target];
    injector.store.update<any>(fullPath, () => payload);
  },
};
