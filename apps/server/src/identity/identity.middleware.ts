import {
  NestMiddleware,
  Injectable,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { set } from 'lodash';

import { AuthJwt } from '../util/passport/jwt/jwt.interface';

import { parseToken } from './utils/security.utils';

@Injectable()
export class IdentityMiddleware implements NestMiddleware {
  @Inject()
  private readonly jwtService: JwtService;

  use(req: Request, res: Response, next: NextFunction) {
    const token = parseToken(req.headers.authorization);

    if (token) {
      const authJwt = this.getAuthJwt(token);
      set(req, 'userId', authJwt.userId);
    }

    next();
  }

  getAuthJwt(token: string) {
    let authJwt: AuthJwt;

    try {
      authJwt = this.jwtService.verify<AuthJwt>(token);
    } catch {
      throw new BadRequestException(
        'Your token was not standard, we cannot parse it, when we was identifying you.',
      );
    }

    return authJwt;
  }
}
