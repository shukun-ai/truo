import { PresenterWidget } from '@shukun/schema';
import { Children, cloneElement, ReactElement, useMemo } from 'react';

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
          const behaviors = widget.events[propertyId];
          behaviors?.forEach((behavior) => {
            const value = executeEventCode(behavior.convertor, payload, {
              templateService: app.templateService,
              states,
            });
            app.eventCallback(behavior, value);
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

const executeEventCode = (
  converter: string | undefined,
  payload: unknown,
  context: {
    templateService: ITemplateService;
    states: Record<string, unknown>;
  },
): unknown => {
  if (!converter) {
    return payload;
  }

  return context.templateService.executeCode(converter, {
    repositories: { ...context.states, payload },
  });
};
