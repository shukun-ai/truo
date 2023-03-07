import { PlayerContainer } from '@shukun/schema';
import { ReactElement, useMemo } from 'react';

import { Injector } from '../injector';

import {
  ConfigDefinitions,
  ReactWidgets,
} from '../loaders/config-manager.interface';

import { ContainerWrapper } from './container-wrapper';
import { usePlayerDefinition } from './contexts/player-definition.context';

import { WidgetWrapper } from './widget-wrapper';

export function AssembledApp({ injector }: { injector: Injector }) {
  const definitions = usePlayerDefinition();

  const containers = useMemo(
    () =>
      definitions && injector
        ? assembleContainers(definitions, injector)
        : null,
    [definitions, injector],
  );

  return <div id="app">{containers}</div>;
}

export function assembleContainers(
  definitions: ConfigDefinitions,
  injector: Injector,
) {
  return Object.entries(definitions.player.containers)
    .filter(
      ([containerName]) =>
        containerName === injector.routerRepository.getValue().page,
    )
    .map(([containerName, definition]) => {
      return (
        <ContainerWrapper containerId={containerName} key={containerName}>
          {assembleWidgets(definition.root, {
            definition,
            containerName,
            widgets: definitions.reactWidgets,
            injector,
          })}
        </ContainerWrapper>
      );
    });
}

function assembleWidgets(
  widgetIds: string[],
  context: {
    definition: PlayerContainer;
    containerName: string;
    widgets: ReactWidgets;
    injector: Injector;
  },
): ReactElement[] {
  const { definition, widgets, containerName } = context;

  return widgetIds.map((widgetId) => {
    const widget = definition.widgets[widgetId];
    const nextChildrenNodes = definition.tree[widgetId];
    let nextElements: ReactElement[] = [];

    if (nextChildrenNodes) {
      nextElements = assembleWidgets(nextChildrenNodes, context);
    }

    const reactWidget = widgets[widget.tag];

    return (
      <WidgetWrapper
        injector={context.injector}
        widgetIs={reactWidget}
        containerId={containerName}
        containerDefinition={definition}
        widgetId={widgetId}
        widgetDefinition={widget}
        key={widgetId}
      >
        {nextElements}
      </WidgetWrapper>
    );
  });
}
