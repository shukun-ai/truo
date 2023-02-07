import {
  MetadataElectron,
  MetadataSchema,
  MigrationElectronMap,
  MigrationMetadataMap,
} from '@shukun/schema';

export class MetadataMapper {
  public parse(metadata: MetadataSchema[]): MigrationMetadataMap {
    return metadata.reduce(this.reduceMetadata.bind(this), {});
  }

  private reduceMetadata(
    previous: MigrationMetadataMap,
    next: MetadataSchema,
  ): MigrationMetadataMap {
    return {
      ...previous,
      [next.name]: this.convertElectrons(next.electrons),
    };
  }

  private convertElectrons(
    electrons: MetadataElectron[],
  ): MigrationElectronMap {
    return electrons.reduce(this.reduceElectrons.bind(this), {});
  }

  private reduceElectrons(
    previous: MigrationElectronMap,
    next: MetadataElectron,
  ): MigrationElectronMap {
    return { ...previous, [next.name]: next };
  }
}
