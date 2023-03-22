import { PresenterContainer } from '@shukun/schema';

import { AppProps } from './app.interface';
import { WidgetWrapper } from './wrapper/widget-wrapper';

export type ContainerProps = {
  containerId: string;
  container: PresenterContainer;
  app: AppProps;
};

export const Container = ({ containerId, container, app }: ContainerProps) => {
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
