import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { omit } from 'lodash';
import { MongooseQueryParser, QueryOptions } from 'mongoose-query-parser';
import { stringify } from 'query-string';

import { SecurityRequest } from '../../../identity/utils/security-request';

export type QueryParserOptions = QueryOptions & { count?: boolean };

export const ParsedQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<SecurityRequest>();
    const parser = new MongooseQueryParser();
    const queryString = stringify(omit(request.query, 'count'));
    const query = parser.parse(queryString);

    const parsedQuery: QueryParserOptions = {
      ...query,
      count: request.query.count === 'true' || false,
    };

    if (!parsedQuery.select) {
      throw new BadRequestException(
        'You must specify fields that you want to select in QueryString, e.g. ?select=id,name',
      );
    }

    // support "_all" to get all fields
    if (parsedQuery.select?._all === 1) {
      parsedQuery.select = {};
    }

    return parsedQuery;
  },
);
