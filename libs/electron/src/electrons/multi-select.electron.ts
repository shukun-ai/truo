import { ElectronFactoryInterface } from '../electron-factory';

export class MultiSelectElectron implements ElectronFactoryInterface {
  buildSqlSchema(): string {
    throw new Error('Did not support MultiSelect type in SQL Schema.');
  }
}
