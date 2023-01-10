import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IDString } from '@shukun/schema';
import { AccessControl } from 'accesscontrol';
import { merge } from 'lodash';

import { RoleService } from '../core/role.service';
import { SourceService } from '../source/source.service';
import { jwtConstants } from '../util/passport/jwt/jwt.constants';
import { AuthJwt } from '../util/passport/jwt/jwt.interface';
import { SystemGroupModel } from '../util/schema/models/system-groups';
import { SystemPositionModel } from '../util/schema/models/system-positions';
import { SystemUserModel } from '../util/schema/models/system-users';

import {
  AccessActionRange,
  AccessActionType,
  AccessControlPermission,
  AccessInternalRoles,
  AccessResourcePrefix,
  GrantList,
} from './interfaces';

@Injectable()
export class SecurityService {
  @Inject()
  private readonly systemUserService!: SourceService<SystemUserModel>;

  @Inject()
  private readonly systemGroupService!: SourceService<SystemGroupModel>;

  @Inject()
  private readonly systemPositionService!: SourceService<SystemPositionModel>;

  @Inject()
  private readonly roleService!: RoleService;

  @Inject()
  private readonly jwtService!: JwtService;

  async getUser(orgName: string, userId: string) {
    const user = await this.systemUserService.findOne(
      orgName,
      'system__users',
      {
        filter: { _id: userId },
      },
    );

    if (!user) {
      throw new BadRequestException(`不存在该用户，用户 ID 为 "${userId}"`);
    }

    return user;
  }

  async getRoleNames(orgName: string, userId: string) {
    // TODO Add redis to save cache.
    const groups = await this.systemGroupService.findAll(
      orgName,
      'system__groups',
      {
        filter: { users: userId },
      },
    );

    const positions = await this.systemPositionService.findAll(
      orgName,
      'system__positions',
      {
        filter: { users: userId },
      },
    );

    let roleNames: string[] = [];

    groups.forEach((item) => {
      roleNames = [...roleNames, ...item.roles];
    });

    positions.forEach((item) => {
      roleNames = [...roleNames, ...item.roles];
    });

    return roleNames;
  }

  async getGrantList(orgName: string): Promise<GrantList | null> {
    const roles = await this.roleService.findAll(orgName);

    let permissions: AccessControlPermission[] = [];

    roles.forEach((role) => {
      const newPermissions: AccessControlPermission[] = role.permissions.map(
        (permission) => ({
          role: role.name,
          resource: `${permission.resourceType}/${permission.resourceName}`,
          action: permission.action,
          attributes: permission.attributes.join(', '),
        }),
      );

      permissions = [...permissions, ...newPermissions];
    });

    const access = new AccessControl(permissions);

    const grantList: GrantList = access.getGrants();

    // Merge default grant list to avoid throw error in AccessControl.
    const defaultGrantList = {
      [AccessInternalRoles.Owner]: {
        none: { 'read:any': ['*'] },
      },
      [AccessInternalRoles.Anonymous]: {
        none: { 'read:any': ['*'] },
      },
    };

    const parsedGrantList = merge({}, defaultGrantList, grantList);

    return parsedGrantList;
  }

  async generateJwt(
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

  async isOwnRead(orgName: string, atomName: string, ownerId: string) {
    const grantList = await this.getGrantList(orgName);
    const roleNames = await this.getRoleNames(orgName, ownerId);

    if (roleNames.includes(AccessInternalRoles.Owner)) {
      return false;
    }

    const access = new AccessControl(grantList);

    const anyPermission = access.permission({
      role: roleNames,
      action: `${AccessActionType.Read}:${AccessActionRange.Any}`,
      resource: `${AccessResourcePrefix.Source}/${atomName}`,
    });

    if (anyPermission.granted) {
      return false;
    }

    const ownPermission = access.permission({
      role: roleNames,
      action: `${AccessActionType.Read}:${AccessActionRange.Own}`,
      resource: `${AccessResourcePrefix.Source}/${atomName}`,
    });

    return ownPermission.granted;
  }
}
