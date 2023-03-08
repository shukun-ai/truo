import { PlayerSchema } from '@shukun/schema';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import { EffectInjector } from '../effects/effect-injector.interface';
import { RouterField } from '../effects/repositories/router-repository';
import { AppProps } from '../ui/app.interface';

export const createObservable = (
  injector: EffectInjector,
): Observable<AppProps> => {
  return injector.repositoryManager.queryAll().pipe(
    map((states: any) => {
      const containerId = states['_app:router'].page;

      const containerStates = cleanData(states, containerId);
      // return null;
      const router = containerStates.router as RouterField;

      const containers = calculateTemplate(
        injector,
        injector.definitions.player,
        containerId,
        containerStates,
      );

      const appProps: AppProps = {
        context: {
          appName: router.app,
          orgName: router.orgName,
        },
        router: {
          page: router.page,
          search: router.search,
        },
        containers,
        player: injector.definitions.player,
        eventCallback: (behavior, payload) => {
          injector.eventQueue.emit(containerId, behavior, payload);
        },
        reactWidgets: injector.definitions.reactWidgets,
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

const calculateTemplate = (
  injector: EffectInjector,
  player: PlayerSchema,
  containerId: string,
  importStates: Record<string, unknown>,
): Record<string, unknown> => {
  const container = player.containers[containerId];

  if (!container) {
    return {};
  }

  const containerStates: Record<string, unknown> = {};

  for (const [widgetId, widget] of Object.entries(container.widgets)) {
    for (const [propertyId, template] of Object.entries(widget.properties)) {
      containerStates[`${containerId}:${widgetId}:${propertyId}`] =
        parseTemplate(injector, importStates, template);
    }
  }

  return containerStates;
};

const parseTemplate = (
  injector: EffectInjector,
  importStates: Record<string, unknown>,
  template: string,
) => {
  const literal = injector.templateService.parse(template);

  if (literal.codes.length === 0) {
    const staticValue = injector.templateService.evaluate(literal, []);
    return staticValue;
  } else {
    const imports = new Array(literal.codes.length).fill(0).map(() => ({
      repositories: importStates,
    }));
    const dynamicValue = injector.templateService.evaluate(literal, imports);
    return dynamicValue;
  }
};
