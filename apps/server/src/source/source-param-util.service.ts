import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSourceConnection, MetadataSchema } from '@shukun/schema';

import { SourceServiceCreateDto } from '../app.type';

import { getFieldInstance } from './electron/fields-map';

@Injectable()
export class SourceParamUtilService {
  buildParams(
    dataSourceConnection: DataSourceConnection,
    metadata: MetadataSchema,
    dto: SourceServiceCreateDto,
  ): SourceServiceCreateDto {
    const sets: SourceServiceCreateDto = {};
    let errorMessage: string[] = [];

    for (const key in dto) {
      if (Object.prototype.hasOwnProperty.call(dto, key)) {
        const value = dto[key];

        const electron = metadata.electrons.find(
          (electron) => electron.name === key,
        );

        if (electron) {
          const field = getFieldInstance(electron.fieldType);
          const result = field.validateValue(value, electron);

          const newMessage = result.map((message) => `${key} ${message}`);

          errorMessage = [...errorMessage, ...newMessage];

          const parsedValue = field.beforeSave
            ? field.beforeSave(value, electron, dataSourceConnection.type)
            : value;

          sets[key] = parsedValue;
        }
      }
    }

    if (errorMessage.length > 0) {
      throw new BadRequestException(errorMessage);
    }

    return sets;
  }
}
