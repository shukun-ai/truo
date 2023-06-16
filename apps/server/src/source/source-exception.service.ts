import { Injectable } from '@nestjs/common';
import {
  SourceDuplicateException,
  SourceUnknownException,
} from '@shukun/exception';
import { MetadataSchema } from '@shukun/schema';

@Injectable()
export class SourceExceptionService {
  public prepareDuplicateException(
    metadata: MetadataSchema,
  ): SourceDuplicateException {
    const electronNames = metadata.electrons
      .filter((electron) => electron.isUnique)
      .map((electron) => electron.name)
      .join(', ');

    return new SourceDuplicateException('{{electronNames}} should be unique', {
      electronNames,
    });
  }

  public prepareUnknownException(error: unknown): SourceUnknownException {
    return new SourceUnknownException('Source happened unknown exception.', {
      error: JSON.stringify(error),
    });
  }
}
