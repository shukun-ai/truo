import { PlayerContainer, PlayerWidget } from '@shukun/schema';
import { ReactElement, useEffect, useMemo, useState } from 'react';

import { Injector } from '../injector';

import { ReactWidget } from '../loaders/config-manager.interface';

import { createSubscription } from './subscription';

export type WidgetWrapperProps = {
  injector: Injector;
  widgetIs: ReactWidget;
  containerId: string;
  containerDefinition: PlayerContainer;
  widgetId: string;
  widgetDefinition: PlayerWidget;
  children: ReactElement[];
};

export const WidgetWrapper = ({
  injector,
  widgetIs,
  containerId,
  containerDefinition,
  widgetId,
  widgetDefinition,
  children,
}: WidgetWrapperProps) => {
  const Widget = widgetIs;

  const [properties, setProperties] = useState<any>();

  useEffect(() => {
    for (const [propertyName, template] of Object.entries(
      widgetDefinition.properties,
    )) {
      createSubscription(injector, template, (value) => {
        setProperties({ ...properties, [propertyName]: value });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId, widgetId]);

  const events = useMemo(() => {
    const events: Record<string, (payload: unknown) => void> = {};
    for (const [eventName, behaviors] of Object.entries(
      widgetDefinition.events,
    )) {
      events[eventName] = (payload) => {
        behaviors.forEach((behavior) => {
          const eventBehavior = containerDefinition.events[behavior];
          injector.eventQueue.emit(eventBehavior, payload);
        });
      };
    }
    return events;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId, widgetId]);

  return (
    <Widget
      containerId={containerId}
      widgetId={widgetId}
      {...properties}
      {...events}
    >
      {children}
    </Widget>
  );
};
