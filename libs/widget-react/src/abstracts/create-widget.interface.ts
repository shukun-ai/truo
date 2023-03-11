import { WidgetSchema } from '@shukun/schema';
import { FromDefinition } from '@shukun/widget';

export type CreateWidget = <
  D extends WidgetSchema,
  T extends FromDefinition<D>,
>(
  definition: D,
  reactWidget: (props: T) => JSX.Element,
) => {
  definition: D;
  reactWidget: (props: T) => JSX.Element;
};
