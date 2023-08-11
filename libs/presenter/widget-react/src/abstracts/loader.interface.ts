import { RouterMode } from '@shukun/presenter/definition';
import { PresenterSchema, RepositorySchema } from '@shukun/schema';

export interface ILoader {
  load(
    orgName: string,
    appName: string,
    routerMode: RouterMode,
  ): Promise<ConfigDefinitions>;
}

export type ConfigDefinitions = {
  presenter: PresenterSchema;
  reactWidgets: ReactWidgets;
  reactRepositories: ReactRepositories;
};

export type ReactWidgets = Record<string, ReactWidget>;

export type ReactWidget = (props: any) => JSX.Element;

export type ReactRepositories = Record<string, RepositorySchema>;
