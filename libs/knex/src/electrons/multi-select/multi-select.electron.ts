import { IElectronBuilder } from '../electron-builder.interface';

export class MultiSelectElectron implements IElectronBuilder {
  buildSqlSchema(): string {
    throw new Error('Did not support MultiSelect type in SQL Schema.');
  }
}
