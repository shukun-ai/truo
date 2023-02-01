import { MetadataElectron, MetadataSchema } from '@shukun/schema';

import { FlatMetadataElectron, FlatMetadataSchema } from './flat-metadata.type';

export class FlatMetadata {
  public flatten(metadata: MetadataSchema[]): FlatMetadataSchema {
    return metadata.reduce(this.reduceMetadata.bind(this), {});
  }

  private reduceMetadata(
    previous: FlatMetadataSchema,
    next: MetadataSchema,
  ): FlatMetadataSchema {
    return {
      ...previous,
      [next.name]: this.convertElectrons(next.electrons),
    };
  }

  private convertElectrons(
    electrons: MetadataElectron[],
  ): FlatMetadataElectron {
    return electrons.reduce(this.reduceElectrons.bind(this), {});
  }

  private reduceElectrons(
    previous: FlatMetadataElectron,
    next: MetadataElectron,
  ): FlatMetadataElectron {
    return { ...previous, [next.name]: next };
  }
}
