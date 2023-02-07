import { Injectable } from '@nestjs/common';
import { IDString } from '@shukun/schema';
import { DataSourceConnection, MetadataSchema } from '@shukun/schema';

import { getFieldInstance } from '../electron/fields-map';

@Injectable()
export class KnexElectronConvertorService<Model> {
  private INTERNAL_FIELD_NAMES = ['_id', 'createdAt', 'updatedAt', 'owner'];

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
    const newEntity: any = {};

    for (const [key, value] of Object.entries(entity)) {
      const electron = metadata.electrons.find(
        (electron) => electron.name === key,
      );
      if (electron) {
        const instance = getFieldInstance(electron);
        newEntity[key] = instance.afterQuery
          ? instance.afterQuery(value, dataSourceConnection.type)
          : value;
      } else if (this.INTERNAL_FIELD_NAMES.includes(key)) {
        newEntity[key] = value;
      }
    }

    return newEntity;
  }
}
