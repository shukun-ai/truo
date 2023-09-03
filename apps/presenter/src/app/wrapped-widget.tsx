import { PresenterWidget } from '@shukun/schema';
import { Children, cloneElement, useEffect, useMemo } from 'react';

import { AppProps, StandardState } from '../interfaces/app';

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

  const standardState: StandardState = { ...state, item, index: index ?? 0 };

  const properties = useMemo(() => {
    const properties: Record<string, unknown> = {};
    const events: Record<string, (payload: unknown) => void> = {};

    for (const [propertyId, property] of Object.entries(widget.properties)) {
      const template = property;
      if (template) {
        properties[propertyId] = runTemplate(template, standardState);
      }
    }

    for (const [eventId, event] of Object.entries(widget.events)) {
      events[eventId] = (payload: unknown) => {
        const events = event;
        handleEvents(
          events,
          state,
          injector,
          appProps.presenter,
          appProps.repositories,
        );
      };
    }

    return { ...properties, ...events };
  }, [
    widget.properties,
    widget.events,
    standardState,
    state,
    injector,
    appProps.presenter,
    appProps.repositories,
  ]);

  useEffect(() => {
    injector.devtool.logWidget(
      widget.label,
      widgetId,
      { index: standardState.index, item: standardState.item },
      properties,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties, standardState.index, standardState.item]);

  if (!ReactWidget) {
    return <div data-error="NOT_FOUND_WIDGET">{children}</div>;
  }

  if (properties['hidden']) {
    return null;
  }

  return (
    <ReactWidget
      id={`${widgetId}:${standardState.index}`}
      app={appProps}
      name={widget.label}
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
