import { Injectable } from '@nestjs/common';
import { IDString } from '@shukun/schema';
import { DataSourceConnection, MetadataSchema } from '@shukun/schema';

import { getFieldInstance } from '../electron/fields-map';

@Injectable()
export class KnexElectronConvertorService<Model> {
  convertAfterQuery(
    dataSourceConnection: DataSourceConnection,
    entities: Array<{ _id: IDString } & Model>,
    metadata: MetadataSchema,
  ): Array<{ _id: IDString } & Model> {
    return entities.map((entity) =>
      this.convertAfterQueryForOne(dataSourceConnection, entity, metadata),
    );
  }

  convertAfterQueryForOne(
    dataSourceConnection: DataSourceConnection,
    entity: { _id: IDString } & Model,
    metadata: MetadataSchema,
  ): { _id: IDString } & Model {
    const newEntity: any = { _id: entity._id };

    for (const [key, value] of Object.entries(entity)) {
      const electron = metadata.electrons.find(
        (electron) => electron.name === key,
      );
      if (electron) {
        const instance = getFieldInstance(electron.fieldType);
        newEntity[key] = instance.afterQuery
          ? instance.afterQuery(value, electron, dataSourceConnection.type)
          : value;
      } else if (key === 'createdAt' || key === 'updatedAt') {
        newEntity[key] = value;
      }
    }

    return newEntity;
  }
}
