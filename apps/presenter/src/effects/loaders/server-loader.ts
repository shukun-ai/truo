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
  FormWidget,
  searchFormWidget,
  GridWidget,
  AlertWidget,
  RadioSelectWidget,
  CardWidget,
  BaseWidget,
  BadgeWidget,
  CheckboxSelectWidget,
  ImageInputWidget,
  MultipleInputWidget,
  BooleanSelectWidget,
  NumberInputWidget,
} from '@shukun/presenter/widget-react';

import { ConfigDefinitions, ILoader } from '@shukun/presenter/widget-react';
import {
  IApiRequester,
  RouterMode,
  SimpleRepository,
  SourceQueryRepository,
} from '@shukun/widget';

export class ServerLoader implements ILoader {
  constructor(private readonly apiRequester: IApiRequester) {}

  async load(
    orgName: string,
    appName: string,
    routerMode: RouterMode,
  ): Promise<ConfigDefinitions> {
    if (routerMode === RouterMode.Local) {
      return await this.loadFromLocal();
    } else {
      return await this.loadFromServer(orgName, appName);
    }
  }

  private async loadFromLocal(): Promise<ConfigDefinitions> {
    const response = await fetch('/presenter/assets/presenter.json');
    const json = await response.json();

    return {
      presenter: json,
      widgetDefinitions,
      reactWidgets,
      reactRepositories,
    };
  }

  private async loadFromServer(
    orgName: string,
    appName: string,
  ): Promise<ConfigDefinitions> {
    const response = await this.apiRequester.publicRequester.getPresenter(
      appName,
      orgName,
    );

    return {
      presenter: response.data.value,
      widgetDefinitions,
      reactWidgets,
      reactRepositories,
    };
  }
}

const widgetDefinitions: ConfigDefinitions['widgetDefinitions'] = {
  'sk-base': BaseWidget.definition,
  'sk-input': InputWidget.definition,
  'sk-image-input': ImageInputWidget.definition,
  'sk-multiple-input': MultipleInputWidget.definition,
  'sk-text': TextWidget.definition,
  'sk-code': CodeWidget.definition,
  'sk-button': ButtonWidget.definition,
  'sk-list': ListWidget.definition,
  'sk-select': SelectWidget.definition,
  'sk-box': BoxWidget.definition,
  'sk-nav-link': NavLinkWidget.definition,
  'sk-table': TableWidget.definition,
  'sk-form': FormWidget.definition,
  'sk-search-form': searchFormWidget.definition,
  'sk-grid': GridWidget.definition,
  'sk-alert': AlertWidget.definition,
  'sk-radio-select': RadioSelectWidget.definition,
  'sk-checkbox-select': CheckboxSelectWidget.definition,
  'sk-card': CardWidget.definition,
  'sk-badge': BadgeWidget.definition,
  'sk-boolean-select': BooleanSelectWidget.definition,
  'sk-number-input': NumberInputWidget.definition,
};

const reactWidgets: ConfigDefinitions['reactWidgets'] = {
  'sk-base': BaseWidget.reactWidget,
  'sk-input': InputWidget.reactWidget,
  'sk-image-input': ImageInputWidget.reactWidget,
  'sk-multiple-input': MultipleInputWidget.reactWidget,
  'sk-text': TextWidget.reactWidget,
  'sk-code': CodeWidget.reactWidget,
  'sk-button': ButtonWidget.reactWidget,
  'sk-list': ListWidget.reactWidget,
  'sk-select': SelectWidget.reactWidget,
  'sk-box': BoxWidget.reactWidget,
  'sk-nav-link': NavLinkWidget.reactWidget,
  'sk-table': TableWidget.reactWidget,
  'sk-form': FormWidget.reactWidget,
  'sk-search-form': searchFormWidget.reactWidget,
  'sk-grid': GridWidget.reactWidget,
  'sk-alert': AlertWidget.reactWidget,
  'sk-radio-select': RadioSelectWidget.reactWidget,
  'sk-checkbox-select': CheckboxSelectWidget.reactWidget,
  'sk-card': CardWidget.reactWidget,
  'sk-badge': BadgeWidget.reactWidget,
  'sk-boolean-select': BooleanSelectWidget.reactWidget,
  'sk-number-input': NumberInputWidget.reactWidget,
};

const reactRepositories: ConfigDefinitions['reactRepositories'] = {
  simple: SimpleRepository,
  sourceQuery: SourceQueryRepository,
};
