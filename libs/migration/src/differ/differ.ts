import { TypeException } from '@shukun/exception';
import { MetadataElectron } from '@shukun/schema';
import { detailedDiff } from 'deep-object-diff';

import { FlatMetadataSchema } from '../flat-metadata/flat-metadata.type';

import { DiffResult } from './differ.type';

export class Differ {
  constructor(
    private readonly left: FlatMetadataSchema,
    private readonly right: FlatMetadataSchema,
  ) {}

  getDetail(): DiffResult {
    return detailedDiff(this.left, this.right) as DiffResult;
  }

  seekLeftElectron(atomName: string, electronName: string): MetadataElectron {
    return this.seekElectron(this.left, atomName, electronName);
  }

  seekRightElectron(atomName: string, electronName: string): MetadataElectron {
    return this.seekElectron(this.right, atomName, electronName);
  }

  private seekElectron(
    origin: FlatMetadataSchema,
    atomName: string,
    electronName: string,
  ): MetadataElectron {
    const electron = origin?.[atomName]?.[electronName];
    if (!electron) {
      throw new TypeException(
        'Did not find electron in Differ: {{atomName}} and {{electronName}}',
        {
          atomName,
          electronName,
        },
      );
    }
    return electron;
  }
}
