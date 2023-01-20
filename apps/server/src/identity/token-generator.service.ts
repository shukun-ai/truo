import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationToken, IDString } from '@shukun/schema';

import { jwtConstants } from '../util/passport/jwt/jwt.constants';

@Injectable()
export class TokenGeneratorService {
  constructor(private readonly jwtService: JwtService) {}

  async generate(
    userId: IDString,
    username: string,
    orgId: IDString,
    orgName: string,
    expiresIn?: number,
  ): Promise<AuthenticationToken> {
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
