import { PlayerContainer, PlayerSchema } from '@shukun/schema';
import { WidgetElementClass } from '@shukun/widget';

export interface IConfigManager {
  register(definitions: ConfigDefinitions): Promise<void>;
  getContainer(containerName: string): PlayerContainer;
  getWidget(tag: string): WidgetElementClass;
  getReactWidget(tag: string): (props: any) => JSX.Element;
}

export type ConfigDefinitions = {
  player: PlayerSchema;
  widgets: WidgetElementClass[];
  reactWidgets: ReactWidgets;
};

export type ReactWidget = (props: any) => JSX.Element;
export type ReactWidgets = Record<string, ReactWidget>;
