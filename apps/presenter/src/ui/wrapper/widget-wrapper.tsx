import { TypeException } from '@shukun/exception';
import { PresenterWidget, WidgetSchema } from '@shukun/schema';
import { ITemplateService, TemplateEvaluateHelpers } from '@shukun/widget';
import { AppProps } from '@shukun/widget-react';
import { Children, cloneElement, ReactElement, useMemo } from 'react';

import { handleEvent } from './event-handler';

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
  const widgetDefinition = app.widgetDefinitions[widget.tag];

  if (!widgetDefinition) {
    console.error(`Did not find tag: ${widget.tag}`);
  }

  const properties = useMemo(() => {
    const properties: Record<string, unknown> = {};
    const states = { ...app.states, item, index: index ?? 0 };

    for (const [propertyId, property] of Object.entries(
      getWidgetAndBoxProperties(widgetDefinition, app),
    )) {
      if (!property.isEvent) {
        const template = widget.properties[propertyId];
        if (template) {
          properties[propertyId] = evaluateTemplate(
            template,
            app.templateService,
            states,
            app.helpers,
          );
        }
      } else {
        properties[propertyId] = (payload: unknown) => {
          const events = widget.events[propertyId];
          events?.forEach((event) => {
            handleEvent(event, {
              repositoryManager: app.repositoryManager,
              templateService: app.templateService,
              states: { payload, ...states },
              containerId,
              helpers: app.helpers,
              apiRequester: app.api,
            });
          });
        };
      }
    }
    return properties;
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

const getWidgetAndBoxProperties = (
  widgetDefinition: WidgetSchema,
  app: AppProps,
) => {
  const boxDefinition = app.widgetDefinitions['sk-base'];

  if (!boxDefinition) {
    throw new TypeException('The box is base widget, must be registered.');
  }

  return {
    ...widgetDefinition.properties,
    ...boxDefinition.properties,
  };
};
