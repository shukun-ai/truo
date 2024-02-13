import { Injectable } from '@nestjs/common';
import { MetadataSchema } from '@shukun/schema';

@Injectable()
export class SourceFieldFilterService {
  private INTERNAL_FIELD_NAMES = ['_id', 'createdAt', 'updatedAt', 'owner'];

  public filter<T>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    json: any,
    metadata: MetadataSchema,
  ): T {
    const electrons = metadata.electrons.map((electron) => electron.name);
    const fieldNames = [...electrons, ...this.INTERNAL_FIELD_NAMES];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newJson: any = {};

    for (const [key, value] of Object.entries(json)) {
      if (fieldNames.includes(key)) {
        // We should convert null to undefined for unified response.
        // Please see https://github.com/shukun-ai/shukun/issues/85
        const parsedValue = value === null ? undefined : value;
        newJson[key] = parsedValue;
      }
    }

    return newJson;
  }
}
