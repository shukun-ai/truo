import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { omit } from 'lodash';
import { MongooseQueryParser, QueryOptions } from 'mongoose-query-parser';

import { SecurityRequest } from '../../../identity/utils/security-request';

export type ParsedBodyQueryOptions = QueryOptions & { count?: boolean };

export const ParsedBodyQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const parser = new MongooseQueryParser();

    const body = getRequestBody(ctx);
    const bodyWithoutCount = omit(body, 'count');
    const query = parser.parse(bodyWithoutCount);

    const queryWithCount: ParsedBodyQueryOptions = {
      ...query,
      count: getBodyCount(body),
    };

    if (!queryWithCount.select) {
      throw new BadRequestException(
        'You must specify fields that you want to select in QueryString, e.g. ?select=id,name',
      );
    }

    // support "_all" to get all fields
    if (queryWithCount.select?._all === 1) {
      queryWithCount.select = {};
    }

    return queryWithCount;
  },
);

function getRequestBody(ctx: ExecutionContext): any {
  const request = ctx.switchToHttp().getRequest<SecurityRequest>();
  const body = JSON.parse(JSON.stringify(request.body));
  return body;
}

function getBodyCount(body: any): boolean {
  if (body.count === 'true' || body.count === true) {
    return true;
  } else if (body.count === 'false' || body.count === false) {
    return false;
  }
  return false;
}
