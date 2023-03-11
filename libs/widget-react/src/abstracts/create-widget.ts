import { CreateWidget } from './create-widget.interface';

export const createWidget: CreateWidget = (definition, reactWidget) => {
  return { definition, reactWidget };
};
