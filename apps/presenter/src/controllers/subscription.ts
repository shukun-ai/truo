import { combineLatest, distinctUntilChanged, map } from 'rxjs';

import { Injector } from '../injector';

export const createSubscription = (
  injector: Injector,
  template: string,
  callback: (value: unknown) => void,
) => {
  const literal = injector.templateService.parse(template);

  if (literal.codes.length === 0) {
    const staticValue = injector.templateService.evaluate(literal, []);
    callback(staticValue);
  }

  const allRepositories = literal.codes.map((code) => {
    return injector.repositoryManager.combineQueries(code.repositories);
  });

  const observable = combineLatest(allRepositories).pipe(
    map((allRepositories) => {
      const imports = allRepositories.map((repository) => ({
        repositories: repository,
      }));
      return injector.templateService.evaluate(literal, imports);
    }),
    distinctUntilChanged(),
  );

  const subscription = observable.subscribe((value) => {
    callback(value);
  });

  return subscription;
};
