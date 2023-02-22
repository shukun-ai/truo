import {
  PlayerContainer,
  PlayerEvent,
  PlayerRepository,
  PlayerWidget,
  WidgetSchema,
} from '@shukun/schema';
import { ShukunWidgetClass } from '@shukun/widget';

export interface IConfigManager {
  load(): Promise<void>;
  registerWidgets(): void;
  getContainer(containerName: string): PlayerContainer;
  getRepository(
    containerName: string,
    repositoryName: string,
  ): PlayerRepository;
  getEvent(containerName: string, eventName: string): PlayerEvent;
  getWidget(containerName: string, widgetName: string): PlayerWidget;
  getWidgetSchema(widgetTag: string): WidgetSchema;
  getWidgetClass(tag: string): ShukunWidgetClass;
}
