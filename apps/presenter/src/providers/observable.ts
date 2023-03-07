import { distinctUntilChanged, map, Observable } from 'rxjs';

import { EffectInjector } from '../effects/effect.interface';
import { RouterField } from '../effects/repositories/router-repository';
import { AppProps } from '../ui/app.interface';

export const createObservable = (
  injector: EffectInjector,
): Observable<AppProps | null> => {
  return injector.repositoryManager.queryAll().pipe(
    map((states: any) => {
      const containerStates = cleanData(states, states['_app:router'].page);
      // return null;
      const router = containerStates.router as RouterField;
      console.log('states', states, containerStates);
      return {
        context: {
          appName: router.app,
          orgName: router.orgName,
        },
        router: {
          page: router.page,
          search: router.search,
        },
        containers: {},
        player: injector.definitions.player,
        eventCallback: () => {
          return;
        },
        widgets: injector.definitions.reactWidgets,
      };
    }),
    distinctUntilChanged(),
  );
};

const cleanData = (states: any, containerId: string) => {
  const newStates: any = {};
  for (const [id, value] of Object.entries(states)) {
    const idSet = id.split(':');
    if (idSet.length === 2) {
      if (idSet[0] === '_app') {
        newStates[idSet[1]] = value;
      } else if (idSet[0] === containerId) {
        newStates[containerId] = value;
      }
    }
  }
  return newStates;
};
