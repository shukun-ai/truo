import { ConfigDefinitions } from '../config/config-manager.interface';

import { ILoader } from '../loader/loader.interface';

import { getLocalElementConstructor } from './local-loader/local-element';

import { getLocalPlayer } from './local-loader/local-player';
import { getLocalWidgetClasses } from './local-loader/local-widget';

export class LocalLoader implements ILoader {
  async load(): Promise<ConfigDefinitions> {
    return {
      player: getLocalPlayer(),
      widgetClasses: getLocalWidgetClasses(),
      customElements: getLocalElementConstructor(),
    };
  }
}
