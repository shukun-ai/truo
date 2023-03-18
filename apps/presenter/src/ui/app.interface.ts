import { PresenterEvent, PresenterSchema } from '@shukun/schema';

import { WidgetDefinitions } from '../effects/loaders/loader.interface';
import {
  ITemplateService,
  TemplateLiteral,
} from '../effects/template/template-service.interface';

export type AppProps = {
  context: {
    appName: string;
    orgName: string;
  };
  router: {
    page: string;
    search: Record<string, unknown>;
  };
  presenter: PresenterSchema;
  eventCallback: (behavior: PresenterEvent, payload: unknown) => void;
  reactWidgets: ReactWidgets;
  widgetDefinitions: WidgetDefinitions;
  states: {
    [repositoryId: string]: unknown;
  };
  templateLiterals: {
    [key: `${string}:${string}:${string}`]: TemplateLiteral;
  };
  templateService: ITemplateService;
};

export type ReactWidget = (...args: any) => JSX.Element;

export type ReactWidgets = Record<string, ReactWidget>;
