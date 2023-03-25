import { AppProps } from '@shukun/widget-react';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import { EffectInjector } from '../effects/effect-injector.interface';

export const createObservable = (
  injector: EffectInjector,
): Observable<AppProps> => {
  return injector.repositoryManager.queryAll().pipe(
    map((rawStates: any) => {
      const router = rawStates['_app:router'];

      const appProps: AppProps = {
        context: {
          debug: true,
          appName: router.app,
          orgName: router.orgName,
          screen: router.page,
          search: router.search,
        },
        presenter: injector.definitions.presenter,
        reactWidgets: injector.definitions.reactWidgets,
        widgetDefinitions: injector.definitions.widgetDefinitions,
        rawStates,
        containerId: null,
        states: {},
        helpers: {},
        templateService: injector.templateService,
        repositoryManager: injector.repositoryManager,
      };

      return appProps;
    }),
    distinctUntilChanged(),
  );
};
