import { PlayerContainer, PlayerSchema } from '@shukun/schema';
import { ReactElement, useMemo } from 'react';

import { ReactWidgets } from '../loaders/config-manager.interface';
import { IRepositoryManager } from '../repository/repository-manager.interface';

import { ContainerWrapper } from './container-wrapper';

import { WidgetWrapper } from './widget-wrapper';

export function AssembledApp({
  player,
  widgets,
  repositoryManager,
}: {
  player: PlayerSchema;
  widgets: ReactWidgets;
  repositoryManager: IRepositoryManager;
}) {
  const states = useMemo(
    () => ({
      router: {
        page: 'home',
      },
    }),
    [],
  );

  const containers = useMemo(() => {
    return assembleContainers(states, player, widgets, repositoryManager);
  }, [states, player, widgets, repositoryManager]);

  return <div id="app">{containers}</div>;
}

export function assembleContainers(
  states: any,
  player: PlayerSchema,
  widgets: ReactWidgets,
  repositoryManager: IRepositoryManager,
) {
  return Object.entries(player.containers)
    .filter(([containerName]) => containerName === states.router.page)
    .map(([containerName, definition]) => {
      return (
        <ContainerWrapper containerId={containerName} key={containerName}>
          {assembleWidgets(definition.root, {
            definition,
            containerName,
            widgets,
            repositoryManager,
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
    repositoryManager: IRepositoryManager;
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
