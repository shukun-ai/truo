import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthJwt } from '../util/passport/jwt/jwt.interface';

@Injectable()
export class TokenVerifyService {
  constructor(private readonly jwtService: JwtService) {}

  public parse(token: string): AuthJwt {
    try {
      return this.jwtService.verify<AuthJwt>(token);
    } catch {
      throw new BadRequestException(
        'Your token was not standard, we cannot parse it, when we was recognizing you.',
      );
    }
  }
}
