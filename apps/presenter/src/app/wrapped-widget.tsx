import { PresenterWidget } from '@shukun/schema';
import { Children, cloneElement, useMemo } from 'react';

import { AppProps } from '../interfaces/app';

import { handleEvents } from './event/handle-events';
import { runTemplate } from './template/template';

export type WrappedWidgetProps = {
  widgetId: string;
  widget: PresenterWidget;
  appProps: AppProps;
  children: JSX.Element | JSX.Element[] | null;
  item?: unknown;
  index?: number;
};

export const WrappedWidget = ({
  widgetId,
  widget,
  appProps,
  children,
  item,
  index,
}: WrappedWidgetProps) => {
  const { widgets, state, injector } = appProps;

  const ReactWidget = widgets[widget.tag];

  const properties = useMemo(() => {
    const properties: Record<string, unknown> = {};
    const events: Record<string, (payload: unknown) => void> = {};
    const states = { state, item, index: index ?? 0 };

    for (const [propertyId, property] of Object.entries(widget.properties)) {
      const template = property;
      if (template) {
        properties[propertyId] = runTemplate(template, states);
      }
    }

    for (const [eventId, event] of Object.entries(widget.events)) {
      events[eventId] = (payload: unknown) => {
        const events = event;
        handleEvents(
          events,
          {
            state,
            index: states.index,
            item: states.item,
            payload,
          },
          injector,
          appProps.presenter,
          appProps.repositories,
        );
      };
    }

    return { ...properties, ...events };
  }, [state, item, index, widget.properties, widget.events]);

  if (!ReactWidget) {
    return <div data-error="NOT_FOUND_WIDGET">{children}</div>;
  }

  if (properties['hidden']) {
    return null;
  }

  return (
    <ReactWidget
      id={`${widgetId}:${index ?? 0}`}
      app={appProps}
      {...properties}
    >
      {children
        ? Children.map(children, (child) =>
            cloneElement(child, { item, index }),
          )
        : null}
    </ReactWidget>
  );
};
