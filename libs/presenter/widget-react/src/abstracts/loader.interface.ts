import { IRepository, RouterMode } from '@shukun/presenter/definition';
import { PresenterSchema, WidgetSchema } from '@shukun/schema';
import { Class } from 'utility-types';

export interface ILoader {
  load(
    orgName: string,
    appName: string,
    routerMode: RouterMode,
  ): Promise<ConfigDefinitions>;
}

export type ConfigDefinitions = {
  presenter: PresenterSchema;
  widgetDefinitions: WidgetDefinitions;
  reactWidgets: ReactWidgets;
  reactRepositories: ReactRepositories;
};

export type WidgetDefinitions = Record<string, WidgetSchema>;

export type ReactWidgets = Record<string, ReactWidget>;

export type ReactWidget = (props: any) => JSX.Element;

export type ReactRepositories = Record<string, Class<IRepository>>;
