import { CreateWidget } from './create-widget.interface';

export const createWidget: CreateWidget = (definition, reactWidget) => {
  const newReactWidget = (...args: any[]) => {
    const props = args[0];
    const newProps: any = {};

    for (const [key, value] of Object.entries(definition.properties)) {
      const input = props[key];
      if (
        value.widgetDefaultValue &&
        (input === '' || input === undefined || input === null)
      ) {
        newProps[key] = value.widgetDefaultValue;
      } else {
        newProps[key] = input;
      }
    }
    return reactWidget.apply(this, [
      newProps,
      args.slice(1, args.length),
    ] as any);
  };

  return { definition, reactWidget: newReactWidget };
};
