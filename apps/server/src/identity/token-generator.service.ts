import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IDString } from '@shukun/schema';

import { jwtConstants } from '../util/passport/jwt/jwt.constants';

import { AuthJwt } from '../util/passport/jwt/jwt.interface';

@Injectable()
export class TokenGeneratorService {
  constructor(private readonly jwtService: JwtService) {}

  async generate(
    userId: IDString,
    username: string,
    orgId: IDString,
    orgName: string,
    expiresIn?: number,
  ): Promise<AuthJwt> {
    const payload = {
      userId: userId,
      username: username,
      orgId,
      orgName,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      userId,
      username,
      orgName,
      orgId,
      tokenType: 'jwt',
      accessToken,
      expiresIn: expiresIn || jwtConstants.expiresIn,
    };
  }
}
