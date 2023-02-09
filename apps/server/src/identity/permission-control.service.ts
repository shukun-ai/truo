import { Injectable } from '@nestjs/common';
import { RoleSchema } from '@shukun/schema';
import {
  GrantedRoles,
  IPermissionControl,
  PermissionControl,
} from '@shukun/validator';

import { RoleService } from '../core/role.service';

import { RoleGeneratorService } from './role-generator.service';

@Injectable()
export class PermissionControlService {
  constructor(
    private readonly roleGeneratorService: RoleGeneratorService,
    private readonly roleService: RoleService,
  ) {}

  async create(orgName: string, userId: string): Promise<IPermissionControl> {
    const roleNames = await this.roleGeneratorService.getRoleNames(
      orgName,
      userId,
    );
    const roles = await this.roleService.findAll(orgName);
    const permissionControl = this.createPermissionControl(roles, roleNames);
    return permissionControl;
  }

  private createPermissionControl(
    roles: RoleSchema[],
    roleNames: GrantedRoles,
  ) {
    return new PermissionControl(roles, roleNames);
  }
}
