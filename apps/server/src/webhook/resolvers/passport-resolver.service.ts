import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IDString } from '../../app.type';
import { OrgService } from '../../core/org.service';
import { SecurityService } from '../../identity/security.service';
import { SourceService } from '../../source/source.service';
import { AuthJwt } from '../../util/passport/jwt/jwt.interface';
import { SystemUserModel } from '../../util/schema/models/system-users';

import { InputOrOutput } from '../../util/workflow/types';

import { Resolver } from './resolver.interface';

interface Parameters {
  userId: IDString;
  expiresIn?: number;
}

@Injectable()
export class PassportResolverService implements Resolver {
  @Inject()
  private readonly systemUserService!: SourceService<SystemUserModel>;

  @Inject()
  private readonly orgService!: OrgService;

  @Inject()
  private readonly securityService!: SecurityService;

  validateParameters() {
    return true;
  }

  async run(
    resourceMethod: string,
    parameters: InputOrOutput,
    orgName: string,
  ): Promise<any> {
    if (resourceMethod === 'jwt') {
      return await this.getJwt(parameters as Parameters, orgName);
    }

    throw new BadRequestException('We only support jwt now.');
  }

  async getJwt(parameters: Parameters, orgName: string): Promise<AuthJwt> {
    const { userId, expiresIn } = parameters;

    const user = await this.systemUserService.findOne(
      orgName,
      'system__users',
      { filter: { _id: userId } },
    );

    const org = await this.orgService.findOne({ filter: { name: orgName } });

    if (!user._id) {
      throw new BadRequestException('We did not find specific user.');
    }

    const output = await this.securityService.generateJwt(
      user._id,
      user.username,
      org._id,
      org.name,
      expiresIn,
    );

    return output;
  }
}
