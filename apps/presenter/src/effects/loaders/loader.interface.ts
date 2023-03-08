import { PlayerSchema } from '@shukun/schema';

export interface ILoader {
  load(orgName: string, appName: string): Promise<ConfigDefinitions>;
}

export type ConfigDefinitions = {
  player: PlayerSchema;
  reactWidgets: ReactWidgets;
};

export type ReactWidgets = Record<string, ReactWidget>;

export type ReactWidget = (props: any) => JSX.Element;
