import {
  AuthState,
  Injector,
  Repository,
  RouterState,
} from '@shukun/presenter/definition';
import { PresenterSchema } from '@shukun/schema';

export type AppProps = {
  injector: Injector;
  presenter: PresenterSchema;
  widgets: Record<string, (props: any) => JSX.Element | JSX.Element[]>;
  repositories: Record<string, Repository>;
  state: StandardState;
};

export type StandardState = {
  router: RouterState;
  auth: AuthState;
  payload: unknown;
  index: number;
  item: unknown;
  [repositoryId: string]: unknown;
};
