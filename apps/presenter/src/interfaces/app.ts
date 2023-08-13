import { Injector } from '@shukun/presenter/definition';
import { ReactWidget } from '@shukun/presenter/widget-react';
import { PresenterSchema, RepositorySchema } from '@shukun/schema';

export type AppProps = {
  injector: Injector;
  presenter: PresenterSchema;
  widgets: Record<string, ReactWidget>;
  repositories: Record<string, RepositorySchema>;
};
