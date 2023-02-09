import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpQuerySchema } from '@shukun/schema';
import {
  httpQuerySchemaValidator,
  validateQueryFilter,
} from '@shukun/validator';

import { SecurityRequest } from '../../../identity/utils/security-request';

export const ParsedHttpQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const body = getRequestBody(ctx);

    httpQuerySchemaValidator.validate(body);

    validateQueryFilter(body);

    return body as HttpQuerySchema;
  },
);

function getRequestBody(ctx: ExecutionContext): unknown {
  const request = ctx.switchToHttp().getRequest<SecurityRequest>();
  const body = JSON.parse(JSON.stringify(request.body));
  return body;
}
