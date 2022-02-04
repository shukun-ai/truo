import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleResourceType } from '@shukun/schema';
import { AccessControl } from 'accesscontrol';
import {
  AccessActionRange,
  AccessActionType,
  AccessInternalRoles,
  GrantList,
} from '../../identity/interfaces';
import { SecurityService } from '../../identity/security.service';
import { getAccessActionType } from '../../identity/utils/security.utils';

import { AuthJwt } from '../../util/passport/jwt/jwt.interface';

import { ResourceNodes } from './authorization.interface';

@Injectable()
export class AuthorizationService {
  @Inject()
  private readonly jwtService!: JwtService;

  @Inject()
  private readonly securityService!: SecurityService;

  async validateResource(
    resourceNodes: ResourceNodes,
    token: string | undefined | null,
  ): Promise<void> {
    // if target path is equal public, then always pass.
    if (
      resourceNodes.resourceType === RoleResourceType.Public ||
      resourceNodes.resourceType === RoleResourceType.View
    ) {
      return;
    }

    // if target path is equal itself, then always do not validate.
    if (resourceNodes.resourceType === RoleResourceType.Internal) {
      throw new ForbiddenException('没有权限操作内部接口。');
    }

    // if has token, go to signed user, then go to anonymous.
    if (token) {
      const authJwt = this.getAuthJwt(token);
      const valid = await this.validateSignedUser(resourceNodes, authJwt);

      if (!valid) {
        throw new ForbiddenException('未授权访问该资源。');
      }
    } else {
      const valid = await this.validateAnonymousUser(resourceNodes);

      if (!valid) {
        throw new UnauthorizedException('未登录无法访问该资源。');
      }
    }
  }

  private async validateSignedUser(
    resourceNodes: ResourceNodes,
    authJwt: AuthJwt,
  ): Promise<boolean> {
    // validate jwt org name and target url path name, if is not equal, then throw exception
    if (resourceNodes.orgName !== authJwt.orgName) {
      throw new ForbiddenException('您没有权限请求另一组织的接口');
    }

    // get user roles
    const userId = await this.validateAndGetUserId(authJwt);

    if (!userId) {
      throw new Error('We did not find userId.');
    }

    const roleNames = await this.getRoleNames(resourceNodes, userId);

    // if owner, then return true.
    if (roleNames.includes(AccessInternalRoles.Owner)) {
      return true;
    }

    // get grant list
    const grantList = await this.securityService.getGrantList(
      resourceNodes.orgName,
    );

    if (!grantList) {
      throw new Error('Do not generate grantList.');
    }

    // validate permission by roles, target resource and grant list.
    return this.validateGrantList(grantList, roleNames, resourceNodes);
  }

  private async validateAnonymousUser(
    resourceNodes: ResourceNodes,
  ): Promise<boolean> {
    // mock user roles
    const roleNames = [AccessInternalRoles.Anonymous];

    // get grant list
    const grantList = await this.securityService.getGrantList(
      resourceNodes.orgName,
    );

    if (!grantList) {
      throw new Error('Do not generate grantList.');
    }

    // validate permission by roles, target resource and grant list.
    return this.validateGrantList(grantList, roleNames, resourceNodes);
  }

  private getAuthJwt(token: string) {
    let authJwt: AuthJwt;

    try {
      authJwt = this.jwtService.verify<AuthJwt>(token);
    } catch {
      throw new BadRequestException(
        'Your token was not standard, we cannot parse it, when we was recognizing you.',
      );
    }

    return authJwt;
  }

  private async validateAndGetUserId(authJwt: AuthJwt) {
    const user = await this.securityService.getUser(
      authJwt.orgName,
      authJwt.userId,
    );

    if (!user) {
      throw new BadRequestException('Token 内包含的用户 ID 不存在');
    }

    return user._id;
  }

  private async getRoleNames(resourceNodes: ResourceNodes, userId: string) {
    const roleNames = await this.securityService.getRoleNames(
      resourceNodes.orgName,
      userId,
    );
    return roleNames;
  }

  private createPermission(
    access: AccessControl,
    roleNames: string[],
    actionType: AccessActionType,
    actionRange: AccessActionRange,
    resourceNodes: ResourceNodes,
  ) {
    return access.permission({
      role: roleNames,
      action: `${actionType}:${actionRange}`,
      resource: `${resourceNodes.resourceType}/${resourceNodes.resourceName}`,
    });
  }

  private validateGrantList(
    grantList: GrantList,
    roleNames: string[],
    resourceNodes: ResourceNodes,
  ) {
    const access = new AccessControl(grantList);

    const actionType = getAccessActionType(resourceNodes.method);

    const anyPermission = this.createPermission(
      access,
      roleNames,
      actionType,
      AccessActionRange.Any,
      resourceNodes,
    );

    if (anyPermission.granted) {
      return true;
    }

    const ownPermission = this.createPermission(
      access,
      roleNames,
      actionType,
      AccessActionRange.Own,
      resourceNodes,
    );

    if (ownPermission.granted) {
      return true;
    }

    return false;
  }
}
