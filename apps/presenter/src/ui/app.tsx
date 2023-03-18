import { PresenterContainer } from '@shukun/schema';
import { useMemo } from 'react';

import { AppProps } from './app.interface';
import { WidgetWrapper } from './wrapper/widget-wrapper';

export const App = (props: AppProps) => {
  const currentContainer = useMemo<PresenterContainer | null>(() => {
    const container = props.presenter.containers[props.router.page];
    return container ?? null;
  }, [props.presenter.containers, props.router.page]);

  if (!currentContainer) {
    return <div>Did not found page.</div>;
  }

  return (
    <Container
      containerId={props.router.page}
      container={currentContainer}
      app={props}
    ></Container>
  );
};

const Container = ({
  containerId,
  container,
  app,
}: {
  containerId: string;
  container: PresenterContainer;
  app: AppProps;
}) => {
  return (
    <div>{assembleWidgets(containerId, container.root, container, app)}</div>
  );
};

const assembleWidgets = (
  containerId: string,
  widgetIds: string[],
  container: PresenterContainer,
  app: AppProps,
): JSX.Element[] => {
  return widgetIds.map((widgetId) => {
    const widget = container.widgets[widgetId];
    const nextChildrenNodes = container.tree[widgetId];
    let nextElements: JSX.Element[] = [];

    if (nextChildrenNodes) {
      nextElements = assembleWidgets(
        containerId,
        nextChildrenNodes,
        container,
        app,
      );
    }

    return (
      <WidgetWrapper
        containerId={containerId}
        widgetId={widgetId}
        widget={widget}
        app={app}
        key={widgetId}
      >
        {nextElements}
      </WidgetWrapper>
    );
  });
};
