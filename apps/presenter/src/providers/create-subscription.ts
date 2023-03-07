import { combineLatest, distinctUntilChanged, map, Observable, of } from 'rxjs';

import { EffectInjector } from '../effects/effect.interface';

export const createSubscription = (
  injector: EffectInjector,
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

export const createObservable = (
  injector: EffectInjector,
  template: string,
): Observable<unknown> => {
  const literal = injector.templateService.parse(template);

  if (literal.codes.length === 0) {
    const staticValue = injector.templateService.evaluate(literal, []);
    return of(staticValue);
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

  return observable;
};
