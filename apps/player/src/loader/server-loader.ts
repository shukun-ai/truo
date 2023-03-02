import { IApiRequester } from '../apis/requester.interface';
import { ConfigDefinitions } from '../config/config-manager.interface';
import { getLocalWidgets } from '../integrate-testing/local-loader/local-widget';

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
      widgets: await getLocalWidgets(),
    };
  }
}
