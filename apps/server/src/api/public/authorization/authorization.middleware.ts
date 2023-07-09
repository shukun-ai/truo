import { NestMiddleware, Injectable, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { parseToken } from '../../../identity/utils/security.utils';

import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  @Inject()
  private readonly authorizationService!: AuthorizationService;

  async use(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const uri = req.baseUrl;
    const token = parseToken(req.headers.authorization);
    await this.authorizationService.validate(method, uri, token);

    next();
  }
}
