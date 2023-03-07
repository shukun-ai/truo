import { distinctUntilChanged, map, Observable } from 'rxjs';

import { EffectInjector } from '../effects/effect.interface';
import { RouterField } from '../effects/repositories/router-repository';
import { AppProps } from '../ui/app.interface';

export const createObservable = (
  injector: EffectInjector,
): Observable<AppProps> => {
  return injector.repositoryManager.queryAll().pipe(
    map((states: any) => {
      const router = states.router as RouterField;
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
