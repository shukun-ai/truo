import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  RoleResourceType,
  RoleSchema,
  AccessInternalRoles,
} from '@shukun/schema';
import { GrantedRoles, PermissionControl } from '@shukun/validator';

import { RoleService } from '../../core/role.service';

import { RoleGeneratorService } from '../../identity/role-generator.service';
import { TokenVerifyService } from '../../identity/token-verify.service';
import { SystemUserService } from '../../system-source/system-user.service';

import { ResourceNodes } from './authorization.interface';
import { getResourceNodes } from './authorization.utils';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly tokenVerifyService: TokenVerifyService,
    private readonly roleGeneratorService: RoleGeneratorService,
    private readonly systemUserService: SystemUserService,
    private readonly roleService: RoleService,
  ) {}

  async validate(
    method: string,
    uri: string,
    token: string | null,
  ): Promise<void> {
    const resourceNodes = getResourceNodes(method, uri);
    await this.validateResource(resourceNodes, token ?? undefined);
  }

  private async validateResource(
    resourceNodes: ResourceNodes,
    token?: string,
  ): Promise<void> {
    switch (resourceNodes.resourceType) {
      case RoleResourceType.Public:
      case RoleResourceType.View:
        return this.allowAny();
      case RoleResourceType.Internal:
      case RoleResourceType.Tenant:
        return this.forbidAny();
      case RoleResourceType.Source:
      case RoleResourceType.Webhook:
      case RoleResourceType.Developer:
        return await this.validateAny(resourceNodes, token);
    }
  }

  private allowAny() {
    return;
  }

  private forbidAny() {
    throw new ForbiddenException('没有权限操作内部接口。');
  }

  private async validateAny(
    resourceNodes: ResourceNodes,
    token?: string,
  ): Promise<void> {
    if (!token) {
      return await this.validateAnonymous(resourceNodes);
    } else {
      return await this.validateSigned(resourceNodes, token);
    }
  }

  private async validateSigned(
    resourceNodes: ResourceNodes,
    token: string,
  ): Promise<void> {
    const authJwt = this.tokenVerifyService.parse(token);
    if (resourceNodes.orgName !== authJwt.orgName) {
      throw new ForbiddenException('您没有权限请求另一组织的接口');
    }
    const user = await this.systemUserService.findOne(
      authJwt.orgName,
      authJwt.userId,
    );
    const roleNames = await this.getRoleNames(resourceNodes, user._id);
    // TODO extract it.
    if (roleNames.includes(AccessInternalRoles.Owner)) {
      return;
    }
    const roles = await this.roleService.findAll(resourceNodes.orgName);
    const result = this.validateGrantList(roles, roleNames, resourceNodes);
    if (!result) {
      throw new ForbiddenException('未授权访问该资源。');
    }
  }

  private async validateAnonymous(resourceNodes: ResourceNodes): Promise<void> {
    const roleNames = [AccessInternalRoles.Anonymous];
    const roles = await this.roleService.findAll(resourceNodes.orgName);
    const result = this.validateGrantList(roles, roleNames, resourceNodes);
    if (!result) {
      throw new UnauthorizedException('未登录无法访问该资源。');
    }
  }

  private async getRoleNames(resourceNodes: ResourceNodes, userId: string) {
    const roleNames = await this.roleGeneratorService.getRoleNames(
      resourceNodes.orgName,
      userId,
    );
    return roleNames;
  }

  private validateGrantList(
    roles: RoleSchema[],
    roleNames: GrantedRoles,
    resourceNodes: ResourceNodes,
  ) {
    const permissionControl = new PermissionControl(roles, roleNames);
    return permissionControl.grant(
      resourceNodes.resourceType,
      resourceNodes.resourceName,
      resourceNodes.resourceFunction,
    );
  }
}
