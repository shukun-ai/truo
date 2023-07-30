import {
  ITemplateService,
  TemplateEvaluateHelpers,
} from '@shukun/presenter/definition';
import { AppProps } from '@shukun/presenter/widget-react';
import { PresenterWidget } from '@shukun/schema';
import { Children, cloneElement, ReactElement, useMemo } from 'react';

export type WidgetWrapperProps = {
  containerId: string;
  widgetId: string;
  widget: PresenterWidget;
  app: AppProps;
  children: ReactElement[];
  item?: unknown;
  index?: number;
};

export const WidgetWrapper = ({
  containerId,
  widgetId,
  widget,
  app,
  children,
  item,
  index,
}: WidgetWrapperProps) => {
  const ReactWidget = app.reactWidgets[widget.tag];

  const properties = useMemo(() => {
    const properties: Record<string, unknown> = {};
    const events: Record<string, (payload: unknown) => void> = {};
    const states = { ...app.states, item, index: index ?? 0 };

    for (const [propertyId, property] of Object.entries(widget.properties)) {
      const template = property;
      if (template) {
        properties[propertyId] = evaluateTemplate(
          template,
          app.templateService,
          states,
          app.helpers,
        );
      }
    }

    for (const [eventId, event] of Object.entries(widget.events)) {
      events[eventId] = (payload: unknown) => {
        const events = event;
        app.eventManager.handleEvents(events, {
          containerId,
          index: states.index,
          item: states.item,
          payload,
        });
      };
    }

    return { ...properties, ...events };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.states, containerId, index, item]);

  if (!ReactWidget) {
    return <div data-error="NOT_FOUND_WIDGET">{children}</div>;
  }

  if (properties['hidden']) {
    return null;
  }

  return (
    <ReactWidget
      composeId={`${containerId}:${widgetId}`}
      app={app}
      {...properties}
    >
      {Children.map(children, (child) => cloneElement(child, { item, index }))}
    </ReactWidget>
  );
};

const evaluateTemplate = (
  template: unknown,
  templateService: ITemplateService,
  states: Record<string, unknown>,
  helpers: TemplateEvaluateHelpers,
): unknown => {
  const value = templateService.run(template, states, helpers);
  return value;
};
