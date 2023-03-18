import { PresenterWidget } from '@shukun/schema';
import { ReactElement, useMemo } from 'react';

import {
  ITemplateService,
  TemplateLiteral,
} from '../../effects/template/template-service.interface';

import { AppProps } from '../app.interface';

export type WidgetWrapperProps = {
  containerId: string;
  widgetId: string;
  widget: PresenterWidget;
  app: AppProps;
  children: ReactElement[];
};

export const WidgetWrapper = ({
  containerId,
  widgetId,
  widget,
  app,
  children,
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
      if (property.type !== 'callback') {
        const templateLiteral =
          app.templateLiterals?.[`${containerId}:${widgetId}:${propertyId}`];
        if (templateLiteral) {
          properties[propertyId] = evaluateTemplate(
            app.templateService,
            templateLiteral,
            app.states,
          );
        }
      } else {
        properties[propertyId] = (payload: unknown) => {
          const behaviors = widget.events[propertyId];
          behaviors?.forEach((behavior) => {
            app.eventCallback(behavior, payload);
          });
        };
      }
    }
    return properties;
  }, [app, containerId, widget.events, widgetDefinition.properties, widgetId]);

  if (!ReactWidget) {
    return <div data-error="NOT_FOUND_WIDGET">{children}</div>;
  }

  return (
    <ReactWidget data-id={`${app.router.page}:${widgetId}`} {...properties}>
      {children}
    </ReactWidget>
  );
};

const evaluateTemplate = (
  templateService: ITemplateService,
  templateLiteral: TemplateLiteral,
  importStates: Record<string, unknown>,
) => {
  if (templateLiteral.codes.length === 0) {
    const staticValue = templateService.evaluate(templateLiteral, []);
    return staticValue;
  } else {
    const imports = new Array(templateLiteral.codes.length).fill(0).map(() => ({
      repositories: importStates,
    }));
    const dynamicValue = templateService.evaluate(templateLiteral, imports);
    return dynamicValue;
  }
};
