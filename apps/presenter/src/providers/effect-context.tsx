import { cloneDeep, set } from 'lodash';
import { useObservableState } from 'observable-hooks';
import { useEffect, useState } from 'react';
import { Observable, Subscription } from 'rxjs';

import { EffectInjector } from '../effects/effect.interface';
import { App } from '../ui/app';

import { AppProps } from '../ui/app.interface';

export const createEffectApp =
  (injector: EffectInjector, observable: Observable<unknown>) => () => {
    // const [app, setApp] = useState<AppProps>(initializeAppProps(injector));

    const appProps = useObservableState(observable);

    //   const values = useObser

    //   useEffect(() => {
    //     const subscriptions = new Map<string, Subscription>();
    //     const containerId = app.router.page;
    //     const container = app.player.containers[containerId];
    //     injector.customRepositoryService.register(container.repositories);

    //     for (const [widgetId, widget] of Object.entries(container.widgets)) {
    //       for (const [propertyId, template] of Object.entries(widget.properties)) {
    //         const subscription = createSubscription(injector, template, (value) => {
    //           console.log(`${containerId}:${widgetId}:${propertyId}`, value);
    //           const cloneContainer = cloneDeep(app.containers);
    //           set(
    //             cloneContainer,
    //             `${containerId}.${widgetId}.${propertyId}`,
    //             value,
    //           );
    //           setApp({
    //             ...app,
    //             containers: cloneContainer,
    //           });
    //         });
    //         subscriptions.set(
    //           `${containerId}:${widgetId}:${propertyId}`,
    //           subscription,
    //         );
    //       }
    //     }

    //     return () => {
    //       // remove subscription
    //       subscriptions.clear();
    //       // unregister container
    //       injector.customRepositoryService.unregister(container.repositories);
    //     };
    //   }, [app.router.page]);

    if (!appProps) {
      return <div>loading...</div>;
    }

    return <App {...(appProps as any)} />;
  };

const initializeAppProps = (injector: EffectInjector): AppProps => {
  const router = injector.routerRepository.getValue();
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
    eventCallback: (behavior, payload) => {
      console.log(behavior, payload);
    },
    widgets: injector.definitions.reactWidgets,
  };
};
