import { ConfigDefinitions } from '../config/config-manager.interface';

export interface ILoader {
  load(): Promise<ConfigDefinitions>;
}
