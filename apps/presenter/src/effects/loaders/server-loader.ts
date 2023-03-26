import {
  ButtonWidget,
  CodeWidget,
  InputWidget,
  TextWidget,
  ListWidget,
  SelectWidget,
  BoxWidget,
  NavLinkWidget,
  TableWidget,
  GridWidget,
  FormWidget,
} from '@shukun/widget-react';

import { ConfigDefinitions, ILoader } from '@shukun/widget-react';

import { IApiRequester } from '../apis/requester.interface';

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
        'sk-list': ListWidget.definition,
        'sk-select': SelectWidget.definition,
        'sk-box': BoxWidget.definition,
        'sk-nav-link': NavLinkWidget.definition,
        'sk-table': TableWidget.definition,
        'sk-grid': GridWidget.definition,
        'sk-form': FormWidget.definition,
      },
      reactWidgets: {
        'sk-input': InputWidget.reactWidget,
        'sk-text': TextWidget.reactWidget,
        'sk-code': CodeWidget.reactWidget,
        'sk-button': ButtonWidget.reactWidget,
        'sk-list': ListWidget.reactWidget,
        'sk-select': SelectWidget.reactWidget,
        'sk-box': BoxWidget.reactWidget,
        'sk-nav-link': NavLinkWidget.reactWidget,
        'sk-table': TableWidget.reactWidget,
        'sk-grid': GridWidget.reactWidget,
        'sk-form': FormWidget.reactWidget,
      },
    };
  }
}
