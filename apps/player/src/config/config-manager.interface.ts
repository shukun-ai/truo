import { PlayerContainer, PlayerSchema } from '@shukun/schema';
import { ShukunWidgetClass } from '@shukun/widget';

export interface IConfigManager {
  getContainer(containerName: string): PlayerContainer;
  getWidgetClass(tag: string): ShukunWidgetClass;
}

export type ConfigDefinitions = {
  player: PlayerSchema;
  widgetClasses: Record<string, ShukunWidgetClass>;
  customElements: Record<string, CustomElementConstructor>;
};
