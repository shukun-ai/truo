import { BoxWidgetProps } from '../box.props';

export const trimBoxModel = (
  boxModel: BoxWidgetProps['boxModel'],
): BoxWidgetProps['boxModel'] => {
  const newBoxModel: any = {};
  for (const [name, value] of Object.entries(boxModel as any)) {
    newBoxModel[name] = value === '' ? undefined : value;
  }
  return newBoxModel;
};
