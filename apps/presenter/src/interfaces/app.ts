import { AuthState, Injector, RouterState } from '@shukun/presenter/definition';
import { PresenterSchema } from '@shukun/schema';

export type AppProps = {
  injector: Injector;
  presenter: PresenterSchema;
  widgets: Record<string, (props: any) => JSX.Element | JSX.Element[]>;
  state: StandardState;
};

export type StandardState = {
  router: RouterState;
  auth: AuthState;
  payload: unknown;
  index: number;
  item: unknown;
  [variableId: string]: unknown;
};
