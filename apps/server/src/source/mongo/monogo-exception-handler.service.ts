import { Injectable } from '@nestjs/common';
import { MetadataSchema } from '@shukun/schema';

import { SourceExceptionService } from '../source-exception.service';

@Injectable()
export class MongoExceptionHandlerService {
  constructor(
    private readonly sourceExceptionService: SourceExceptionService,
  ) {}

  handle(error: unknown, metadata: MetadataSchema): Error {
    if (this.isDuplicateError(error)) {
      return this.sourceExceptionService.prepareDuplicateException(metadata);
    }

    return this.sourceExceptionService.prepareUnknownException(error);
  }

  private isDuplicateError(error: unknown): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isMongoDuplicateError = (error as any)?.message?.startsWith(
      'E11000 duplicate key error collection',
    );

    return !!isMongoDuplicateError;
  }
}
