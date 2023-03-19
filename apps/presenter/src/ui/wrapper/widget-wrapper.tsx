import { PresenterWidget } from '@shukun/schema';
import { Children, cloneElement, ReactElement, useMemo } from 'react';

import {
  ITemplateService,
  TemplateLiteral,
} from '../../effects/template/template-service.interface';

import { AppProps } from '../app.interface';

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
    for (const [propertyId, property] of Object.entries(
      widgetDefinition.properties,
    )) {
      const states = { ...app.states, item, index: index ?? 0 };

      if (property.type !== 'callback') {
        const templateLiteral =
          app.templateLiterals?.[`${containerId}:${widgetId}:${propertyId}`];
        if (templateLiteral) {
          properties[propertyId] = evaluateTemplate(
            app.templateService,
            templateLiteral,
            states,
          );
        }
      } else {
        properties[propertyId] = (payload: unknown) => {
          const events = widget.events[propertyId];
          events?.forEach((event) => {
            handleEvent(event, payload, {
              repositoryManager: app.repositoryManager,
              templateService: app.templateService,
              states,
              containerId,
            });
          });
        };
      }
    }
    return properties;
  }, [
    app,
    containerId,
    index,
    item,
    widget.events,
    widgetDefinition.properties,
    widgetId,
  ]);

  if (!ReactWidget) {
    return <div data-error="NOT_FOUND_WIDGET">{children}</div>;
  }

  return (
    <ReactWidget data-id={`${app.router.page}:${widgetId}`} {...properties}>
      {Children.map(children, (child) => cloneElement(child, { item, index }))}
    </ReactWidget>
  );
};

const evaluateTemplate = (
  templateService: ITemplateService,
  templateLiteral: TemplateLiteral,
  states: Record<string, unknown>,
) => {
  const dependencies = {
    repositories: states,
  };
  const value = templateService.evaluate(templateLiteral, dependencies);
  return value;
};
