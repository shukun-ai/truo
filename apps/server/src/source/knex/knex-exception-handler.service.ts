import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class KnexExceptionHandlerService {
  handle(error: any): Error {
    if (
      typeof error === 'object' &&
      error !== null &&
      'severity' in error &&
      error.severity === 'ERROR' &&
      'code' in error &&
      error.code === '23505'
    ) {
      return this.handlePostgresDuplicationException(error);
    }

    return new InternalServerErrorException(
      '发生未知错误，错误信息是' + error?.toString(),
    );
  }

  /* @example
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
  handlePostgresDuplicationException(error: any): Error {
    const message =
      typeof error === 'object' && error !== null && 'detail' in error
        ? error.detail
        : '';
    return new Error(`存在唯一字段重复值：${message}`);
  }
}
