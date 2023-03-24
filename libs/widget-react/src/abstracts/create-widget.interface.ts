import { WidgetSchema } from '@shukun/schema';

export type CreateWidget = <T>(
  definition: WidgetSchema,
  reactWidget: (props: T & WidgetChildren) => JSX.Element,
) => {
  definition: WidgetSchema;
  reactWidget: (props: T & WidgetChildren) => JSX.Element;
};

type WidgetChildren = {
  children: JSX.Element;
};
