import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationToken } from '@shukun/schema';

@Injectable()
export class TokenVerifyService {
  constructor(private readonly jwtService: JwtService) {}

  public parse(token: string): AuthenticationToken {
    try {
      return this.jwtService.verify<AuthenticationToken>(token);
    } catch {
      throw new BadRequestException(
        'Your token was not standard, we cannot parse it, when we was recognizing you.',
      );
    }
  }
}
