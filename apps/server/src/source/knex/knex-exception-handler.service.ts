import { Injectable } from '@nestjs/common';
import { MetadataSchema } from '@shukun/schema';

import { SourceExceptionService } from '../source-exception.service';

@Injectable()
export class KnexExceptionHandlerService {
  constructor(
    private readonly sourceExceptionService: SourceExceptionService,
  ) {}

  handle(error: unknown, metadata: MetadataSchema): Error {
    if (this.isDuplicateError(error)) {
      return this.sourceExceptionService.prepareDuplicateException(metadata);
    }

    return this.sourceExceptionService.prepareUnknownException(error);
  }

  /* @remark duplicate error detail
  {
    length: 213,
    severity: 'ERROR',
    code: '23505',
    detail: 'Key (number)=(Su-001) already exists.',
    hint: undefined,
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: 'public',
    table: 'devices',
    column: undefined,
    dataType: undefined,
    constraint: 'devices_number_unique',
    file: 'nbtinsert.c',
    line: '671',
    routine: '_bt_check_unique'
  }
  */
  private isDuplicateError(error: any): boolean {
    const isDuplicateError =
      typeof error === 'object' &&
      error !== null &&
      'severity' in error &&
      error.severity === 'ERROR' &&
      'code' in error &&
      error.code === '23505';
    return !!isDuplicateError;
  }
}
