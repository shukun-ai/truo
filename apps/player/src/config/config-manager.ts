import { PlayerContainer } from '@shukun/schema';
import { ShukunWidgetClass } from '@shukun/widget';

import { IConfigManager } from './config-manager.interface';
import { PlayerLoader } from './implements/player-loader';
import { WidgetLoader } from './implements/widget-loader';

export class ConfigManager implements IConfigManager {
  private containers: Record<string, PlayerContainer> = {};

  private widgetClasses: Record<string, ShukunWidgetClass> = {};

  async load(): Promise<void> {
    const widgetLoader = new WidgetLoader();
    const playerLoader = new PlayerLoader();
    const [widgetClasses, player] = await Promise.all([
      widgetLoader.loadWidgets(),
      playerLoader.load(),
    ]);
    this.widgetClasses = widgetClasses;
    this.containers = player.containers;
  }

  registerWidgets(): void {
    // Just a hook
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
