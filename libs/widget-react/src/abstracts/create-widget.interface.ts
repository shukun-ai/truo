import { WidgetSchema } from '@shukun/schema';
import { IRepositoryManager, ITemplateService } from '@shukun/widget';

export type CreateWidget = <T>(
  definition: WidgetSchema,
  reactWidget: (props: T & WidgetDefaultProps) => JSX.Element,
) => {
  definition: WidgetSchema;
  reactWidget: (props: T & WidgetDefaultProps) => JSX.Element;
};

export type WidgetAppProps = {
  repositoryManager: IRepositoryManager;
  templateService: ITemplateService;
};

type WidgetDefaultProps = {
  children: JSX.Element;
  app: WidgetAppProps;
};
