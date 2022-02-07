import { NestMiddleware, Injectable, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { parseToken } from '../../identity/utils/security.utils';

import { AuthorizationService } from './authorization.service';
import { getResourceNodes } from './authorization.utils';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  @Inject()
  private readonly authorizationService!: AuthorizationService;

  async use(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const uri = req.baseUrl;
    const authorization = req.headers.authorization;

    const resourceNodes = getResourceNodes(method, uri);
    const token = parseToken(authorization);
    await this.authorizationService.validateResource(resourceNodes, token);

    next();
  }
}
