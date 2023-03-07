import { IApiRequester } from '../apis/requester.interface';
import { ButtonWidget } from '../integrate-testing/widgets/button.widget';
import { CodeWidget } from '../integrate-testing/widgets/code.widget';
import { InputWidget } from '../integrate-testing/widgets/input.widget';
import { TextWidget } from '../integrate-testing/widgets/text.widget';

import { ConfigDefinitions } from './config-manager.interface';
import { ILoader } from './loader.interface';

export class ServerLoader implements ILoader {
  constructor(private readonly apiRequester: IApiRequester) {}

  async load(orgName: string, appName: string): Promise<ConfigDefinitions> {
    const response = await this.apiRequester.publicRequester.getPlayer(
      appName,
      orgName,
    );

    return {
      player: response.data.value,
      widgets: [], //await getLocalWidgets(),
      reactWidgets: {
        'sk-input': InputWidget,
        'sk-text': TextWidget,
        'sk-code': CodeWidget,
        'sk-button': ButtonWidget,
      },
    };
  }
}
