import { TypeException } from '@shukun/exception';
import { PlayerContainer, WidgetSchema } from '@shukun/schema';
import { WidgetElementClass } from '@shukun/widget';

import { ConfigDefinitions, IConfigManager } from './config-manager.interface';

export class ConfigManager implements IConfigManager {
  private containers = new Map<string, PlayerContainer>();

  private widgets = new Map<string, WidgetElementClass>();

  public async register(definitions: ConfigDefinitions) {
    this.containers = new Map(Object.entries(definitions.player.containers));

    definitions.widgets.forEach((widgetClass) => {
      // @remark widgetClass should set any,
      // because the Class that imported from 'utility-types' is not support static.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const schema = (widgetClass as any).schema as WidgetSchema;
      this.widgets.set(schema.tag, widgetClass);
      customElements.define(schema.tag, widgetClass);
    });
  }

  public getWidget(tag: string): WidgetElementClass {
    const widget = this.widgets.get(tag);
    if (!widget) {
      throw new Error();
    }
    return widget;
  }

  public getContainer(containerName: string): PlayerContainer {
    const container = this.containers.get(containerName);
    if (!container) {
      throw new TypeException('Did not find container');
    }
    return container;
  }
}
