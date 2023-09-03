import { Repository } from '@shukun/presenter/definition';

import { parseJson } from '../common/json';

export const temporaryRepository: Repository = {
  register(payload, event, injector, repository): void {
    const defaultValue = repository.parameters['defaultValue'];
    const fullPath = [event.target];
    if (defaultValue && typeof defaultValue === 'string') {
      const value = parseJson(defaultValue);
      injector.store.update<any>(fullPath, () => value);
    }
  },

  setValue(payload, event, injector, repository): void {
    const { path } = event;
    const fullPath = path ? [event.target].concat(path) : [event.target];
    injector.store.update<any>(fullPath, () => payload);
  },
};
