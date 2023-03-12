import { WidgetSchema } from '@shukun/schema';

export type CreateWidget = <T>(
  definition: WidgetSchema,
  reactWidget: (props: T) => JSX.Element,
) => {
  definition: WidgetSchema;
  reactWidget: (props: T) => JSX.Element;
};
