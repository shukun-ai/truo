import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { HttpQuerySchema, validateHttpQuerySchema } from '@shukun/schema';

import { SecurityRequest } from '../../../identity/utils/security-request';

export const ParsedHttpQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const body = getRequestBody(ctx);

    const result = validateHttpQuerySchema(body);

    if (!result) {
      throw new BadRequestException(
        JSON.stringify(validateHttpQuerySchema.errors),
      );
    }

    return body as HttpQuerySchema;
  },
);

function getRequestBody(ctx: ExecutionContext): unknown {
  const request = ctx.switchToHttp().getRequest<SecurityRequest>();
  const body = JSON.parse(JSON.stringify(request.body));
  return body;
}
