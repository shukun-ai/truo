import { MigrationDifference, MigrationMetadataMap } from '@shukun/interface';
import { detailedDiff } from 'deep-object-diff';

export class MetadataDiffer {
  getDetail(
    left: MigrationMetadataMap,
    right: MigrationMetadataMap,
  ): MigrationDifference {
    return detailedDiff(left, right) as MigrationDifference;
  }
}
