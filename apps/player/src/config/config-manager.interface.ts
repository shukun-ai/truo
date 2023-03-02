import { PlayerContainer, PlayerSchema } from '@shukun/schema';
import { WidgetElementClass } from '@shukun/widget';

export interface IConfigManager {
  register(definitions: ConfigDefinitions): Promise<void>;
  getContainer(containerName: string): PlayerContainer;
  getWidget(tag: string): WidgetElementClass;
}

export type ConfigDefinitions = {
  player: PlayerSchema;
  widgets: WidgetElementClass[];
};
