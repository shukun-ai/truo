import {
  ButtonWidget,
  CodeWidget,
  InputWidget,
  TextWidget,
  GroupWidget,
  ListWidget,
  StackWidget,
  ContainerWidget,
  SelectWidget,
} from '@shukun/widget-react';

import { IApiRequester } from '../apis/requester.interface';

import { ConfigDefinitions, ILoader } from './loader.interface';

export class ServerLoader implements ILoader {
  constructor(private readonly apiRequester: IApiRequester) {}

  async load(orgName: string, appName: string): Promise<ConfigDefinitions> {
    const response = await this.apiRequester.publicRequester.getPresenter(
      appName,
      orgName,
    );

    return {
      presenter: response.data.value,
      widgetDefinitions: {
        'sk-input': InputWidget.definition,
        'sk-text': TextWidget.definition,
        'sk-code': CodeWidget.definition,
        'sk-button': ButtonWidget.definition,
        'sk-group': GroupWidget.definition,
        'sk-list': ListWidget.definition,
        'sk-stack': StackWidget.definition,
        'sk-container': ContainerWidget.definition,
        'sk-select': SelectWidget.definition,
      },
      reactWidgets: {
        'sk-input': InputWidget.reactWidget,
        'sk-text': TextWidget.reactWidget,
        'sk-code': CodeWidget.reactWidget,
        'sk-button': ButtonWidget.reactWidget,
        'sk-group': GroupWidget.reactWidget,
        'sk-list': ListWidget.reactWidget,
        'sk-stack': StackWidget.reactWidget,
        'sk-container': ContainerWidget.reactWidget,
        'sk-select': SelectWidget.reactWidget,
      },
    };
  }
}
