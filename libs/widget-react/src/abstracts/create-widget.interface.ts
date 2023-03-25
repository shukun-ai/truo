import { WidgetSchema } from '@shukun/schema';
import { IRepositoryManager } from '@shukun/widget';

export type CreateWidget = <T>(
  definition: WidgetSchema,
  reactWidget: (props: T & WidgetDefaultProps) => JSX.Element,
) => {
  definition: WidgetSchema;
  reactWidget: (props: T & WidgetDefaultProps) => JSX.Element;
};

export type WidgetAppProps = {
  repositoryManager: IRepositoryManager;
};

type WidgetDefaultProps = {
  children: JSX.Element;
  app: WidgetAppProps;
};
