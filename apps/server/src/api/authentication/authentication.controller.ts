import {
  Controller,
  UseInterceptors,
  Param,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';

import { AuthenticationToken, RoleResourceType } from '@shukun/schema';

import { OrgService } from '../../core/org.service';

import { TokenGeneratorService } from '../../identity/token-generator.service';
import { cryptoPassword } from '../../identity/utils/password.utils';
import { SourceService } from '../../source/source.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';
import { RsaHelper } from '../../util/rsa/rsa-helper';
import { SystemUserModel } from '../../util/schema/models/system-users';

import { SignInWithEncryptDto } from './dto/sign-in-with-encrypt.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller(`${RoleResourceType.Public}/:orgName/authentication`)
@UseInterceptors(QueryResponseInterceptor)
export class AuthenticationController {
  constructor(
    private readonly tokenGeneratorService: TokenGeneratorService,

    private readonly systemUserService: SourceService<SystemUserModel>,

    private readonly orgService: OrgService,
  ) {}

  @Post('jwt')
  async signIn(
    @Param('orgName') orgName: string,
    @Body() signInDto: SignInDto,
  ): Promise<QueryResponse<AuthenticationToken>> {
    const atomName = 'system__users';

    const password = cryptoPassword(signInDto.password);

    const user = await this.findUser({
      orgName,
      atomName,
      username: signInDto.username,
      password,
    });

    const orgId = await this.orgService.findOrgId(orgName);

    if (!user._id) {
      throw new Error('缺少用户的 ID 值');
    }

    const output = await this.tokenGeneratorService.generate(
      user._id,
      user.username,
      orgId,
      orgName,
    );

    return {
      value: output,
    };
  }

  @Post('jwt_encrypt')
  async signInWithEncrypt(
    @Param('orgName') orgName: string,
    @Body() signInWithEncryptDto: SignInWithEncryptDto,
  ): Promise<QueryResponse<AuthenticationToken>> {
    const rsaHelper = new RsaHelper();

    const password = rsaHelper.decrypt(signInWithEncryptDto.encryptPassword);

    const signInDto: SignInDto = {
      username: signInWithEncryptDto.username,
      password,
    };

    return this.signIn(orgName, signInDto);
  }

  private async findUser({
    orgName,
    atomName,
    username,
    password,
  }: {
    orgName: string;
    atomName: string;
    username: string;
    password: string;
  }) {
    try {
      const value = await this.systemUserService.findOne(orgName, atomName, {
        filter: { username: username, password },
      });

      return value;
    } catch (error) {
      throw new BadRequestException('您好，用户名与密码可能不匹配。');
    }
  }
}
