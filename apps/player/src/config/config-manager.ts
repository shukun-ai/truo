import { TypeException } from '@shukun/exception';
import { PlayerContainer } from '@shukun/schema';
import { ShukunWidgetClass } from '@shukun/widget';

import { ConfigDefinitions, IConfigManager } from './config-manager.interface';

export class ConfigManager implements IConfigManager {
  private containers: Map<string, PlayerContainer>;

  private widgetClasses: Map<string, ShukunWidgetClass>;

  constructor(readonly definitions: ConfigDefinitions) {
    this.widgetClasses = new Map(Object.entries(definitions.widgetClasses));
    this.containers = new Map(Object.entries(definitions.player.containers));
  }

  getContainer(containerName: string): PlayerContainer {
    const container = this.containers.get(containerName);
    if (!container) {
      throw new TypeException('Did not find container');
    }
    return container;
  }

  getWidgetClass(tag: string) {
    const widgetClass = this.widgetClasses.get(tag);
    if (!widgetClass) {
      throw new TypeException('Did not find widgetClass');
    }
    return widgetClass;
  }
}
