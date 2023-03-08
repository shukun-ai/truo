import { PlayerContainer, PlayerWidget } from '@shukun/schema';
import { ReactElement, useMemo } from 'react';

import { AppProps } from './app.interface';

export type WidgetWrapperProps = {
  widgetId: string;
  widgetDefinition: PlayerWidget;
  container: PlayerContainer;
  app: AppProps;
  children: ReactElement[];
};

export const WidgetWrapper = ({
  widgetId,
  widgetDefinition,
  container,
  app,
  children,
}: WidgetWrapperProps) => {
  const ReactWidget = app.reactWidgets[widgetDefinition.tag];

  const properties = useMemo(() => {
    const properties: Record<string, unknown> = {};
    for (const [propertyId] of Object.entries(widgetDefinition.properties)) {
      properties[propertyId] =
        app.containers?.[`${app.router.page}:${widgetId}:${propertyId}`];
    }
    return properties;
  }, [app.containers, app.router.page, widgetDefinition.properties, widgetId]);

  const events = useMemo(() => {
    const events: Record<string, (payload: unknown) => void> = {};
    for (const [eventName, behaviors] of Object.entries(
      widgetDefinition.events,
    )) {
      events[eventName] = (payload) => {
        behaviors.forEach((behavior) => {
          const eventBehavior = container.events[behavior];
          app.eventCallback(eventBehavior, payload);
        });
      };
    }
    return events;
  }, [app, container.events, widgetDefinition.events]);

  if (!ReactWidget) {
    return <div data-error="NOT_FOUND_WIDGET">{children}</div>;
  }

  return (
    <ReactWidget
      data-id={`${app.router.page}:${widgetId}`}
      {...properties}
      {...events}
    >
      {children}
    </ReactWidget>
  );
};
