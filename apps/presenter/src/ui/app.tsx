import { PlayerContainer } from '@shukun/schema';
import { useMemo } from 'react';

import { AppProps } from './app.interface';
import { WidgetWrapper } from './wrapper/widget-wrapper';

export const App = (props: AppProps) => {
  const currentContainer = useMemo<PlayerContainer | null>(() => {
    const container = props.player.containers[props.router.page];
    return container ?? null;
  }, [props.player.containers, props.router.page]);

  if (!currentContainer) {
    return <div>Did not found page.</div>;
  }

  return <Container container={currentContainer} app={props}></Container>;
};

const Container = ({
  container,
  app,
}: {
  container: PlayerContainer;
  app: AppProps;
}) => {
  return <div>{assembleWidgets(container.root, container, app)}</div>;
};

const assembleWidgets = (
  widgetIds: string[],
  container: PlayerContainer,
  app: AppProps,
): JSX.Element[] => {
  return widgetIds.map((widgetId) => {
    const widget = container.widgets[widgetId];
    const nextChildrenNodes = container.tree[widgetId];
    let nextElements: JSX.Element[] = [];

    if (nextChildrenNodes) {
      nextElements = assembleWidgets(nextChildrenNodes, container, app);
    }

    return (
      <WidgetWrapper
        widgetId={widgetId}
        widget={widget}
        container={container}
        app={app}
        key={widgetId}
      >
        {nextElements}
      </WidgetWrapper>
    );
  });
};
