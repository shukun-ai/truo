import { ElectronFactoryInterface } from '../electron-factory';

export class RoleElectron implements ElectronFactoryInterface {
  buildSqlSchema(): string {
    throw new Error('Did not support Role type in SQL Schema.');
  }
}
