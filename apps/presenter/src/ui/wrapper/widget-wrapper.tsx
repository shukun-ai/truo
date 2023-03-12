import { PlayerContainer, PlayerWidget } from '@shukun/schema';
import { ReactElement, useMemo } from 'react';

import { AppProps } from '../app.interface';

export type WidgetWrapperProps = {
  widgetId: string;
  widget: PlayerWidget;
  container: PlayerContainer;
  app: AppProps;
  children: ReactElement[];
};

export const WidgetWrapper = ({
  widgetId,
  widget,
  container,
  app,
  children,
}: WidgetWrapperProps) => {
  const ReactWidget = app.reactWidgets[widget.tag];
  const widgetDefinition = app.widgetDefinitions[widget.tag];

  const properties = useMemo(() => {
    const properties: Record<string, unknown> = {};
    for (const [propertyId, property] of Object.entries(
      widgetDefinition.properties,
    )) {
      if (property.type !== 'callback') {
        properties[propertyId] =
          app.containers?.[`${app.router.page}:${widgetId}:${propertyId}`];
      } else {
        properties[propertyId] = (payload: unknown) => {
          const behaviors = widget.events[propertyId];
          behaviors?.forEach((behavior) => {
            const eventBehavior = container.events[behavior];
            app.eventCallback(eventBehavior, payload);
          });
        };
      }
    }
    return properties;
  }, [
    app,
    container.events,
    widget.events,
    widgetDefinition.properties,
    widgetId,
  ]);

  if (!ReactWidget) {
    return <div data-error="NOT_FOUND_WIDGET">{children}</div>;
  }

  return (
    <ReactWidget data-id={`${app.router.page}:${widgetId}`} {...properties}>
      {children}
    </ReactWidget>
  );
};
