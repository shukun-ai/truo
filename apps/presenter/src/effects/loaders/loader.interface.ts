import { PlayerSchema, WidgetSchema } from '@shukun/schema';

export interface ILoader {
  load(orgName: string, appName: string): Promise<ConfigDefinitions>;
}

export type ConfigDefinitions = {
  player: PlayerSchema;
  widgetDefinitions: WidgetDefinitions;
  reactWidgets: ReactWidgets;
};

export type WidgetDefinitions = Record<string, WidgetSchema>;

export type ReactWidgets = Record<string, ReactWidget>;

export type ReactWidget = (props: any) => JSX.Element;
