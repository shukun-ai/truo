import { PlayerContainer } from '@shukun/schema';
import { ShukunWidgetClass } from '@shukun/widget';

export interface IConfigManager {
  load(): Promise<void>;
  registerWidgets(): void;
  getContainer(containerName: string): PlayerContainer;
  getWidgetClass(tag: string): ShukunWidgetClass;
}
