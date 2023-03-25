import { RouterRepositoryStates } from '@shukun/widget';
import { AppProps } from '@shukun/widget-react';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import { EffectInjector } from '../effects/effect-injector.interface';

export const createObservable = (
  injector: EffectInjector,
): Observable<AppProps> => {
  return injector.repositoryManager.queryAll().pipe(
    map((states: any) => {
      const containerId = states['_app:router'].page;
      const containerStates = cleanData(states, containerId);
      const router = containerStates.router as RouterRepositoryStates;

      const appProps: AppProps = {
        context: {
          appName: router.app,
          orgName: router.orgName,
        },
        router: {
          page: router.page,
          search: router.search,
        },
        presenter: injector.definitions.presenter,
        reactWidgets: injector.definitions.reactWidgets,
        widgetDefinitions: injector.definitions.widgetDefinitions,
        states: containerStates,
        templateService: injector.templateService,
        repositoryManager: injector.repositoryManager,
      };

      return appProps;
    }),
    distinctUntilChanged(),
  );
};

const cleanData = (states: any, containerId: string) => {
  const newStates: any = {};
  for (const [id, value] of Object.entries(states)) {
    const idSet = id.split(':');

    if (idSet[0] === '_app') {
      newStates[idSet[1]] = value;
    } else if (idSet[0] === 'container' && idSet[1] === containerId) {
      newStates[idSet[2]] = value;
    } else if (idSet[0] === 'repository' && idSet[1] === containerId) {
      newStates[idSet[2]] = value;
    }
  }
  return newStates;
};
