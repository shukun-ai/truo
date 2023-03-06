import { PlayerWidget } from '@shukun/schema';
import React, { ReactElement, useEffect, useState } from 'react';

import { ReactWidget } from '../loaders/config-manager.interface';

import { createSubscription } from './subscription';

export type WidgetWrapperProps = {
  widgetIs: ReactWidget;
  containerId: string;
  widgetId: string;
  widgetDefinition: PlayerWidget;
  children: ReactElement[];
};

export const WidgetWrapper = ({
  widgetIs,
  containerId,
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
      createSubscription(template, (value) => {
        setProperties({ ...properties, [propertyName]: value });
      });
    }
  }, [containerId, widgetId]);

  return (
    <Widget containerId={containerId} widgetId={widgetId} {...properties}>
      {children}
    </Widget>
  );
};
