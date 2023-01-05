import { ElectronFactoryInterface } from '../electron-factory';

export class ManyToManyElectron implements ElectronFactoryInterface {
  buildSqlSchema(): string {
    throw new Error('Did not support ManyToMany type in SQL Schema.');
  }
}
