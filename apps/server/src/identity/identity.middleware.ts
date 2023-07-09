import {
  NestMiddleware,
  Injectable,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationToken } from '@shukun/schema';
import { Request, Response, NextFunction } from 'express';
import { set } from 'lodash';

import { parseToken } from './utils/security.utils';

/**
 * @deprecated
 */
@Injectable()
export class IdentityMiddleware implements NestMiddleware {
  @Inject()
  private readonly jwtService!: JwtService;

  use(req: Request, res: Response, next: NextFunction) {
    const token = parseToken(req.headers.authorization);

    if (token) {
      const authJwt = this.getAuthJwt(token);
      set(req, 'userId', authJwt.userId);
      set(req, 'accessToken', token);
    }

    next();
  }

  getAuthJwt(token: string) {
    let authJwt: AuthenticationToken;

    try {
      authJwt = this.jwtService.verify<AuthenticationToken>(token);
    } catch {
      throw new BadRequestException(
        'Your token was not standard, we cannot parse it, when we was identifying you.',
      );
    }

    return authJwt;
  }
}
