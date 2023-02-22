import { PlayerContainer } from '@shukun/schema';
import { ShukunWidgetClass } from '@shukun/widget';

import { ConfigDefinitions, IConfigManager } from './config-manager.interface';

export class ConfigManager implements IConfigManager {
  private containers: Record<string, PlayerContainer> = {};

  private widgetClasses: Record<string, ShukunWidgetClass> = {};

  constructor(readonly definitions: ConfigDefinitions) {
    this.widgetClasses = definitions.widgetClasses;
    this.containers = definitions.player.containers;
  }

  getContainer(containerName: string): PlayerContainer {
    return this.containers[containerName];
  }

  getWidgetClass(tag: string) {
    const widgetConstructor = this.widgetClasses[tag];
    if (!widgetConstructor) {
      throw new Error();
    }
    return widgetConstructor;
  }
}
