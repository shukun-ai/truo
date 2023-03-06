import { PlayerContainer, PlayerSchema } from '@shukun/schema';
import { ReactElement, useMemo } from 'react';

import { ReactWidgets } from '../loaders/config-manager.interface';

export function AssembledApp({
  player,
  widgets,
}: {
  player: PlayerSchema;
  widgets: ReactWidgets;
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
    return assembleContainers(states, player, widgets);
  }, [states, player, widgets]);

  return <div id="app">{containers}</div>;
}

export function assembleContainers(
  states: any,
  player: PlayerSchema,
  widgets: ReactWidgets,
) {
  return Object.entries(player.containers)
    .filter(([containerName]) => containerName === states.router.page)
    .map(([containerName, definition]) => {
      return (
        <div id={containerName}>
          {assembleContainer(definition, containerName, widgets)}
        </div>
      );
    });
}

export function assembleContainer(
  definition: PlayerContainer,
  containerName: string,
  widgets: ReactWidgets,
) {
  return assembleWidgets(definition.root, {
    definition,
    containerName,
    widgets,
  });
}

function assembleWidgets(
  widgetIds: string[],
  context: {
    definition: PlayerContainer;
    containerName: string;
    widgets: ReactWidgets;
  },
): ReactElement[] {
  const { definition, widgets } = context;

  return widgetIds.map((widgetId) => {
    const widget = definition.widgets[widgetId];
    const nextChildrenNodes = definition.tree[widgetId];
    let nextElements: ReactElement[] = [];

    if (nextChildrenNodes) {
      nextElements = assembleWidgets(nextChildrenNodes, context);
    }

    const ReactWidget = widgets[widget.tag];
    return <ReactWidget id={widget.tag}>{nextElements}</ReactWidget>;
  });
}
