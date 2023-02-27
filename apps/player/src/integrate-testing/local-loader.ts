import { ConfigDefinitions } from '../config/config-manager.interface';

import { ILoader } from '../loader/loader.interface';

import { getLocalPlayer } from './local-loader/local-player';
import { getLocalWidgets } from './local-loader/local-widget';

export class LocalLoader implements ILoader {
  async load(): Promise<ConfigDefinitions> {
    return {
      player: getLocalPlayer(),
      widgets: await getLocalWidgets(),
    };
  }
}
