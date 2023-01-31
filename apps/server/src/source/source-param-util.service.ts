import { Injectable } from '@nestjs/common';
import { InterpolationMap, SourceValidateException } from '@shukun/exception';
import { DataSourceConnection, MetadataSchema } from '@shukun/schema';

import { SourceServiceCreateDto } from '../app.type';

import { ElectronExceptions } from './electron/electron-field.interface';

import { getFieldInstance } from './electron/fields-map';

@Injectable()
export class SourceParamUtilService {
  buildParams(
    dataSourceConnection: DataSourceConnection,
    metadata: MetadataSchema,
    dto: SourceServiceCreateDto,
  ): SourceServiceCreateDto {
    const sets: SourceServiceCreateDto = {};
    let errorMessages: ElectronExceptions = [];

    for (const key in dto) {
      if (Object.prototype.hasOwnProperty.call(dto, key)) {
        const value = dto[key];

        const electron = metadata.electrons.find(
          (electron) => electron.name === key,
        );

        if (electron) {
          const field = getFieldInstance(electron);
          const electronExceptions = field.validateValue(value);

          errorMessages = [...errorMessages, ...electronExceptions];

          const parsedValue = field.beforeSave
            ? field.beforeSave(value, dataSourceConnection.type)
            : value;

          sets[key] = parsedValue;
        }
      }
    }

    if (errorMessages.length > 0) {
      throw this.combineElectronExceptions(errorMessages);
    }

    return sets;
  }

  private combineElectronExceptions(exceptions: ElectronExceptions) {
    const initialException: {
      messages: string;
      interpolationMap: InterpolationMap;
    } = {
      messages: '',
      interpolationMap: {},
    };

    const exceptionMap = exceptions.reduce((previous, next) => {
      return {
        messages: `${previous.messages} ${next.message}`,
        interpolationMap: {
          ...previous.interpolationMap,
          ...next.interpolationMap,
        },
      };
    }, initialException);

    return new SourceValidateException(
      exceptions[0].message,
      exceptionMap.interpolationMap,
    );
  }
}
