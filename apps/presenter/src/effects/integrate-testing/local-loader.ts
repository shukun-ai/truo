import { ConfigDefinitions } from '../loaders/config-manager.interface';
import { ILoader } from '../loaders/loader.interface';

import { getLocalPlayer } from './local-loader/local-player';
import { ButtonWidget } from './widgets/button.widget';
import { CodeWidget } from './widgets/code.widget';
import { InputWidget } from './widgets/input.widget';
import { TextWidget } from './widgets/text.widget';

export class LocalLoader implements ILoader {
  async load(): Promise<ConfigDefinitions> {
    return {
      player: getLocalPlayer(),
      widgets: [],
      reactWidgets: {
        'sk-input': InputWidget,
        'sk-text': TextWidget,
        'sk-code': CodeWidget,
        'sk-button': ButtonWidget,
      },
    };
  }
}
