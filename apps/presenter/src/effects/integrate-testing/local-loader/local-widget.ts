import { WidgetElementClass } from '@shukun/widget';

export async function getLocalWidgets(): Promise<WidgetElementClass[]> {
  const module = await import('@shukun/widget');
  return [
    module.InputWidget,
    module.ContainerWidget,
    module.TextWidget,
    module.CodeWidget,
    module.ButtonWidget,
  ];
}
