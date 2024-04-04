import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { SeedCreateDto } from '@shukun/api';
import {
  applicationSeedData,
  SystemPositionModel,
  SystemUserModel,
} from '@shukun/schema';

import { CodebaseService } from '../core/codebase.service';
import { IOrg } from '../core/org/org.schema';
import { OrgService } from '../core/org.service';
import { SourceService } from '../source/source.service';

@Injectable()
export class TenantService {
  constructor(
    private readonly codebaseService: CodebaseService,
    private readonly orgService: OrgService,
    private readonly systemUserService: SourceService<SystemUserModel>,
    private readonly systemPositionService: SourceService<SystemPositionModel>,
  ) {}

  @Post()
  async createNewOrg(seed: SeedCreateDto): Promise<null> {
    // create org
    const org = await this.createOrg(seed);

    // upload codebase
    await this.codebaseService.update(org.name, applicationSeedData);

    // create user
    const rootUser = await this.systemUserService.createOne(
      org.name,
      'system__users',
      {
        displayName: seed.username,
        username: seed.username,
        password: seed.password,
      },
      null,
    );

    if (!rootUser || !rootUser._id) {
      throw new BadRequestException('We did not find rootUser.');
    }

    // create position
    await this.systemPositionService.createOne(
      org.name,
      'system__positions',
      {
        name: 'owner',
        label: '所有者',
        isSystem: true,
        users: [rootUser._id],
        roles: ['owner'],
      },
      rootUser._id,
    );

    return null;
  }

  private async createOrg(createDto: SeedCreateDto): Promise<IOrg> {
    let org: IOrg;

    try {
      org = await this.orgService.createOne(createDto);
    } catch (error) {
      throw new BadRequestException(
        `${createDto.label}(${createDto.name}) 组织已存在，无法创建新组织。`,
      );
    }

    return org;
  }

  async destroyOrg(orgName: string): Promise<null> {
    // TODO destroy all collections.
    await this.orgService.deleteOne(orgName);
    return null;
  }
}
