import { WidgetSchema } from '@shukun/schema';

import { AppProps } from './app.interface';

export type CreateWidget = <T>(
  definition: WidgetSchema,
  reactWidget: (props: T & WidgetDefaultProps) => JSX.Element,
) => {
  definition: WidgetSchema;
  reactWidget: (props: T & WidgetDefaultProps) => JSX.Element;
};

type WidgetDefaultProps = {
  children: JSX.Element;
  app: AppProps;
};
