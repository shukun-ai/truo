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
    const fields = metadata.electrons
      .filter((electron) => electron.isUnique)
      .map((electron) => electron.name)
      .join(', ');

    return new SourceDuplicateException('{{fields}}: should be unique.', {
      fields,
    });
  }

  public prepareUnknownException(error: unknown): SourceUnknownException {
    return new SourceUnknownException('Source happened unknown exception.', {
      error: JSON.stringify(error),
    });
  }
}
