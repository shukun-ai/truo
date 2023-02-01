import { TypeException } from '@shukun/exception';
import { MetadataElectron } from '@shukun/schema';

import { DiffResult } from '../differ/differ.type';

export class Validator {
  validate(differences: DiffResult, options?: { disabled?: boolean }) {
    for (const [atomName, atom] of Object.entries(differences.updated)) {
      for (const [electronName, electron] of Object.entries(atom)) {
        this.validateElectron(
          atomName,
          electronName,
          electron,
          options?.disabled ?? false,
        );
      }
    }
  }

  private validateElectron(
    atomName: string,
    electronName: string,
    electron: Partial<MetadataElectron>,
    disabled: boolean,
  ) {
    if (electron.fieldType && !disabled) {
      throw new TypeException(
        'We do not allow to change fieldType in electron, please recover previous type, from {{atomName}}->{{electronName}}.',
        {
          atomName,
          electronName,
        },
      );
    }
  }
}
