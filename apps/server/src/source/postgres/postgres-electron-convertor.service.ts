import { Injectable } from '@nestjs/common';
import { IDString } from '@shukun/api';
import { getElectronInstance } from '@shukun/electron';
import { MetadataSchema } from '@shukun/schema';

@Injectable()
export class PostgresElectronConvertorService<Model> {
  convertAfterQuery(
    entities: Array<{ _id: IDString } & Model>,
    metadata: MetadataSchema,
  ): Array<{ _id: IDString } & Model> {
    return entities.map((entity) =>
      this.convertAfterQueryForOne(entity, metadata),
    );
  }

  convertAfterQueryForOne(
    entity: { _id: IDString } & Model,
    metadata: MetadataSchema,
  ): { _id: IDString } & Model {
    const newEntity: any = { _id: entity._id };

    for (const [key, value] of Object.entries(entity)) {
      const electron = metadata.electrons.find(
        (electron) => electron.name === key,
      );
      if (electron) {
        const instance = getElectronInstance(electron.fieldType);
        newEntity[key] = instance.afterQuery
          ? instance.afterQuery(value, electron)
          : value;
      } else if (key === 'createdAt' || key === 'updatedAt') {
        newEntity[key] = value;
      }
    }

    return newEntity;
  }
}
