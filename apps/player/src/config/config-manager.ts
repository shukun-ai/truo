import {
  PlayerContainer,
  PlayerRepository,
  PlayerEvent,
  PlayerWidget,
  WidgetSchema,
} from '@shukun/schema';
import { ShukunWidgetClass } from '@shukun/widget';

import { IConfigManager } from './config-manager.interface';
import { PlayerLoader } from './implements/player-loader';
import { WidgetLoader } from './implements/widget-loader';

export class ConfigManager implements IConfigManager {
  containers: Record<string, PlayerContainer> = {};

  widgetSchemas: Record<string, WidgetSchema> = {};

  widgetConstructors: Record<string, ShukunWidgetClass> = {};

  getWidgetClass(tag: string) {
    const widgetConstructor = this.widgetConstructors[tag];
    if (!widgetConstructor) {
      throw new Error();
    }
    return widgetConstructor;
  }

  async load(): Promise<void> {
    const widgetLoader = new WidgetLoader();
    const playerLoader = new PlayerLoader();
    const [schemas, widgets, player] = await Promise.all([
      widgetLoader.loadSchemas(),
      widgetLoader.loadWidgets(),
      playerLoader.load(),
    ]);
    this.widgetSchemas = schemas;
    this.widgetConstructors = widgets;
    this.containers = player.containers;
  }

  registerWidgets(): void {
    // for (const [tag, widget] of Object.entries(this.widgetConstructors)) {
    //   customElements.define(tag, widget);
    // }
  }

  getContainer(containerName: string): PlayerContainer {
    return this.containers[containerName];
  }

  getRepository(
    containerName: string,
    repositoryName: string,
  ): PlayerRepository {
    return this.getContainer(containerName).repositories[repositoryName];
  }

  getEvent(containerName: string, eventName: string): PlayerEvent {
    return this.getContainer(containerName).events[eventName];
  }

  getWidget(containerName: string, widgetName: string): PlayerWidget {
    return this.getContainer(containerName).widgets[widgetName];
  }

  getWidgetSchema(widgetTag: string): WidgetSchema {
    return this.widgetSchemas[widgetTag];
  }
}
