import { ConfigDefinitions } from './config-manager.interface';

export interface ILoader {
  load(orgName: string, appName: string): Promise<ConfigDefinitions>;
}
