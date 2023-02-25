import { ShukunWidget } from '@shukun/widget';

export interface IPageController {
  mountApp(root: HTMLElement): void;
  getWidget(containerName: string, widgetInstanceName: string): ShukunWidget;
  // addWidget(
  //   containerName: string,
  //   widgetInstanceName: string,
  //   widget: ShukunWidget,
  // ): void;
}
