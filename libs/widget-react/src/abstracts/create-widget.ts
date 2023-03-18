import { CreateWidget } from './create-widget.interface';

export const createWidget: CreateWidget = (definition, reactWidget) => {
  const newReactWidget = (...args: any[]) => {
    const props = args[0];
    const newProps: any = {};

    for (const [key, value] of Object.entries(definition.properties)) {
      const input = props[key];
      if (
        value.defaultValue &&
        value.type !== 'callback' &&
        (input === '' || input === undefined || input === null)
      ) {
        newProps[key] = value.defaultValue;
      } else {
        newProps[key] = input;
      }
    }

    const composedProps = { ...props, ...newProps };

    return reactWidget.apply(this, [
      composedProps,
      args.slice(1, args.length),
    ] as any);
  };

  return { definition, reactWidget: newReactWidget };
};
