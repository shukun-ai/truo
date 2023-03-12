import {
  ButtonWidget,
  CodeWidget,
  InputWidget,
  TextWidget,
} from '@shukun/widget-react';

import { IApiRequester } from '../apis/requester.interface';

import { ConfigDefinitions, ILoader } from './loader.interface';

export class ServerLoader implements ILoader {
  constructor(private readonly apiRequester: IApiRequester) {}

  async load(orgName: string, appName: string): Promise<ConfigDefinitions> {
    const response = await this.apiRequester.publicRequester.getPlayer(
      appName,
      orgName,
    );

    return {
      player: response.data.value,
      reactWidgets: {
        'sk-input': InputWidget.reactWidget,
        'sk-text': TextWidget.reactWidget,
        'sk-code': CodeWidget.reactWidget,
        'sk-button': ButtonWidget.reactWidget,
      },
    };
  }
}
