import { PlayerContainer, PlayerSchema } from '@shukun/schema';
import { WidgetElementClass } from '@shukun/widget';

export interface IConfigManager {
  getContainer(containerName: string): PlayerContainer;
  getWidget(tag: string): WidgetElementClass;
}

export type ConfigDefinitions = {
  player: PlayerSchema;
  widgets: WidgetElementClass[];
};
