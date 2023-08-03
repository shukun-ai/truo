import {
  IApiRequester,
  RouterMode,
  SimpleRepository,
  SourceQueryRepository,
} from '@shukun/presenter/definition';

import {
  ConfigDefinitions,
  ILoader,
  presenterWidgets,
} from '@shukun/presenter/widget-react';

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
      reactWidgets,
      reactRepositories,
    };
  }
}

const reactWidgets: ConfigDefinitions['reactWidgets'] = presenterWidgets;

const reactRepositories: ConfigDefinitions['reactRepositories'] = {
  simple: SimpleRepository,
  sourceQuery: SourceQueryRepository,
};
