import { AppProps } from '@shukun/widget-react';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import { EffectInjector } from '../effects/effect-injector.interface';
import { get } from '../effects/store/store-utils';

export const createObservable = (
  injector: EffectInjector,
): Observable<AppProps> => {
  return injector.store.queryAll().pipe(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map((rawStates: any) => {
      const router = get(rawStates, ['app', 'router']);
      const showSignInScreen = !get(rawStates, ['app', 'auth', 'current']);

      const appProps: AppProps = {
        context: {
          debug: true,
          appName: router.app,
          orgName: router.orgName,
          screen: router.page,
          search: router.search,
          mode: router.mode,
        },
        presenter: injector.definitions.presenter,
        reactWidgets: injector.definitions.reactWidgets,
        widgetDefinitions: injector.definitions.widgetDefinitions,
        rawStates,
        containerId: null,
        showSignInScreen,
        states: {},
        store: injector.store,
        helpers: {},
        templateService: injector.templateService,
        repositoryManager: injector.repositoryManager,
        watchManager: injector.watchManager,
        eventManager: injector.eventManager,
        api: injector.apiRequester,
      };

      return appProps;
    }),
    distinctUntilChanged(),
  );
};
