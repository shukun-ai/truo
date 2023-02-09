import { IElectronBuilder } from '../electron-builder.interface';

export class ManyToManyElectron implements IElectronBuilder {
  buildSqlSchema(): string {
    throw new Error('Did not support ManyToMany type in SQL Schema.');
  }
}
