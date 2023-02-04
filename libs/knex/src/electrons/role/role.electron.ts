import { IElectronBuilder } from '../electron-builder.interface';

export class RoleElectron implements IElectronBuilder {
  buildSqlSchema(): string {
    throw new Error('Did not support Role type in SQL Schema.');
  }
}
