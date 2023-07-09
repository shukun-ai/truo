import { Injectable } from '@nestjs/common';

import { execute } from './connector-handler';
import { HandlerContext } from './types';

@Injectable()
export class ConnectorHandlerService {
  async execute(context: HandlerContext): Promise<HandlerContext> {
    return execute(context);
  }
}
