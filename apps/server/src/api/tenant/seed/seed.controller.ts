import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  applicationSeedData,
  RoleResourceType,
  SystemPositionModel,
  SystemUserModel,
} from '@shukun/schema';

import { OrgDocument } from '../../../core/org/org.schema';
import { OrgService } from '../../../core/org.service';
import { SourceService } from '../../../source/source.service';
import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';

import { SeedCreateDto } from './seed.dto';

/**
 * @deprecated
 */
@Controller(`/${RoleResourceType.Tenant}/any/seeds`)
@UseInterceptors(QueryResponseInterceptor)
export class SeedController {
  @Inject()
  private readonly orgService!: OrgService;

  @Inject()
  private readonly systemUserService!: SourceService<SystemUserModel>;

  @Inject()
  private readonly systemPositionService!: SourceService<SystemPositionModel>;

  @Post()
  async createNewOrg(
    @Body() createDto: SeedCreateDto,
  ): Promise<QueryResponse<null>> {
    // create org
    const org = await this.createOrg(createDto);

    // upload codebase
    await this.orgService.updateCodebase(org.name, applicationSeedData);

    // create user
    const rootUser = await this.systemUserService.createOne(
      org.name,
      'system__users',
      {
        displayName: createDto.username,
        username: createDto.username,
        password: createDto.password,
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

    return {
      value: null,
    };
  }

  async createOrg(createDto: SeedCreateDto): Promise<OrgDocument> {
    let org: OrgDocument;

    try {
      org = await this.orgService.createOne(createDto);
    } catch (error) {
      throw new BadRequestException(
        `${createDto.label}(${createDto.name}) 组织已存在，无法创建新组织。`,
      );
    }

    return org;
  }

  @Post('destroy')
  async destroyOrg(
    @Body() dto: { orgName: string },
  ): Promise<QueryResponse<null>> {
    // TODO destroy all collections.
    await this.orgService.deleteOne(dto.orgName);
    return {
      value: null,
    };
  }
}
