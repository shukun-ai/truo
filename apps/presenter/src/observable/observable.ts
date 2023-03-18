import { distinctUntilChanged, map, Observable } from 'rxjs';

import { EffectInjector } from '../effects/effect-injector.interface';
import { RouterField } from '../effects/repositories/router-repository';
import { TemplateLiteral } from '../effects/template/template-service.interface';
import { AppProps } from '../ui/app.interface';

export const createObservable = (
  injector: EffectInjector,
): Observable<AppProps> => {
  return injector.repositoryManager.queryAll().pipe(
    map((states: any) => {
      const containerId = states['_app:router'].page;
      const containerStates = cleanData(states, containerId);
      const router = containerStates.router as RouterField;
      const templateLiterals = getTemplateLiterals(injector);

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
        eventCallback: (behavior, payload) => {
          injector.eventQueue.emit(containerId, behavior, payload);
        },
        reactWidgets: injector.definitions.reactWidgets,
        widgetDefinitions: injector.definitions.widgetDefinitions,
        states: containerStates,
        templateLiterals,
        templateService: injector.templateService,
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

const getTemplateLiterals = (
  injector: EffectInjector,
): { [key: `${string}:${string}:${string}`]: TemplateLiteral } => {
  const templateLiterals: {
    [key: `${string}:${string}:${string}`]: TemplateLiteral;
  } = {};
  for (const [containerId, container] of Object.entries(
    injector.definitions.presenter.containers,
  )) {
    for (const [widgetId, widget] of Object.entries(container.widgets)) {
      for (const [propertyId, template] of Object.entries(widget.properties)) {
        templateLiterals[`${containerId}:${widgetId}:${propertyId}`] =
          injector.templateService.parse(template);
      }
    }
  }
  return templateLiterals;
};
