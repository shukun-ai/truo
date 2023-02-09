import { MigrationDifference, MigrationMetadataMap } from '@shukun/schema';
import { detailedDiff } from 'deep-object-diff';

export class MetadataDiffer {
  getDetail(
    left: MigrationMetadataMap,
    right: MigrationMetadataMap,
  ): MigrationDifference {
    const leftAtomHash = this.createAtomHash(left);
    const rightAtomHash = this.createAtomHash(right);
    const hashDifference = this.getHashDifference(leftAtomHash, rightAtomHash);

    const difference: MigrationDifference = {
      added: this.parseHash(hashDifference.added, right),
      updated: this.parseHash(hashDifference.updated, right),
      deleted: this.parseHash(hashDifference.deleted, left),
    };

    return difference;
  }

  private createAtomHash(metadataMap: MigrationMetadataMap) {
    const newAtoms: Record<string, string> = {};
    for (const [atomName, electrons] of Object.entries(metadataMap)) {
      const newElectrons: Record<string, string> = {};
      for (const [electronName, electron] of Object.entries(electrons)) {
        const field = {
          fieldType: electron.fieldType,
          isRequired: electron.isRequired,
          isUnique: electron.isUnique,
          isIndexed: electron.isIndexed,
        };
        newElectrons[electronName] = JSON.stringify(field);
      }
      newAtoms[atomName] = JSON.stringify(newElectrons);
    }
    return newAtoms;
  }

  private getHashDifference(
    left: Record<string, string>,
    right: Record<string, string>,
  ) {
    return detailedDiff(left, right) as {
      added: Record<string, string>;
      updated: Record<string, string>;
      deleted: Record<string, string>;
    };
  }

  private parseHash(
    changes: Record<string, string>,
    right: MigrationMetadataMap,
  ) {
    const newMetadata: MigrationMetadataMap = {};
    for (const atomName of Object.keys(changes)) {
      newMetadata[atomName] = right[atomName];
    }
    return newMetadata;
  }
}
