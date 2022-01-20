import {
  Controller,
  UseInterceptors,
  Inject,
  Param,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { OrgService } from '../../core/org.service';
import { SystemUserModel } from '../../util/schema/models/system-users';

import { SecurityService } from '../../identity/security.service';
import { cryptoPassword } from '../../identity/utils/password.utils';
import { SourceService } from '../../source/source.service';
import { AuthJwt } from '../../util/passport/jwt/jwt.interface';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';
import { ResourceType } from '../api.type';

import { SignInDto } from './dto/sign-in.dto';

@Controller(`${ResourceType.Public}/:orgName/authentication`)
@UseInterceptors(QueryResponseInterceptor)
export class AuthenticationController {
  @Inject()
  private readonly securityService!: SecurityService;

  @Inject()
  private readonly systemUserService!: SourceService<SystemUserModel>;

  @Inject()
  private readonly orgService!: OrgService;

  @Post('jwt')
  async signIn(
    @Param('orgName') orgName: string,
    @Body() signInDto: SignInDto,
  ): Promise<QueryResponse<AuthJwt>> {
    const atomName = 'system__users';

    const password = cryptoPassword(signInDto.password);

    const value = await this.systemUserService.findOne(orgName, atomName, {
      filter: { username: signInDto.username, password },
    });

    const orgId = await this.orgService.findOrgId(orgName);

    if (!value) {
      throw new BadRequestException('您好，用户名与密码可能不匹配。');
    }

    if (!value._id) {
      throw new Error('Maybe value._id is missing.');
    }

    const output = await this.securityService.generateJwt(
      value._id,
      value.username,
      orgId,
      orgName,
    );

    return {
      value: output,
    };
  }
}
