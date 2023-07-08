import { TypeException } from '@shukun/exception';
import { AppProps } from '@shukun/presenter/widget-react';
import { PresenterContainer } from '@shukun/schema';

import { useWatchManager } from './hooks/use-watch-manager';
import { WidgetWrapper } from './wrapper/widget-wrapper';

export type ContainerProps = {
  containerId: string;
  container: PresenterContainer;
  app: AppProps;
};

export const Container = ({ containerId, container, app }: ContainerProps) => {
  const root: string[] = container.tree?.['root'] ?? [];

  useWatchManager(containerId, container, app);

  return <div>{assembleWidgets(containerId, root, container, app)}</div>;
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

    if (!widget) {
      // TODO mark LD level
      throw new TypeException(
        'The widget is mounted in tree, but did not defined in the widget: {{widgetId}}',
        {
          widgetId,
        },
      );
    }

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
