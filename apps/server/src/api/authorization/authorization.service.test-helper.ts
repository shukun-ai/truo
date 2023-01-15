import { BadRequestException } from '@nestjs/common';
import { RoleSchema, AccessInternalRoles } from '@shukun/schema';

import { AuthJwt } from '../../util/passport/jwt/jwt.interface';

export const cooRole = 'coo';

export const cfoRole = 'cfo';

export const ownerUser = {
  _id: 'ownerUser',
  username: 'ownerUser',
};

export const anonymousUser = {
  _id: 'anonymousUser',
  username: 'anonymousUser',
};

export const cooUser = {
  _id: 'cooUser',
  username: 'cooUser',
};

export const cfoUser = {
  _id: 'cfoUser',
  username: 'cfoUser',
};

export const validOwnerUserToken = 'validOwnerUserToken';

export const validCooUserToken = 'validCooUserToken';

export const validCfoUserToken = 'validCfoUserToken';

export const invalidOrgNameToken = 'invalidOrgNameToken';

export const anonymousUserToken = null;

export const mockSecurityServiceGetUser = async (
  orgName: string,
  userId: string,
) => {
  switch (userId) {
    case ownerUser._id:
      return ownerUser;
    case cooUser._id:
      return cooUser;
    case cfoUser._id:
      return cfoUser;
    default:
      throw new BadRequestException();
  }
};

export const mockSecurityServiceGetRoleNames = async (
  orgName: string,
  userId: string,
) => {
  switch (userId) {
    case ownerUser._id:
      return [AccessInternalRoles.Owner];
    case cooUser._id:
      return [cooRole];
    case cfoUser._id:
      return [cfoRole];
    default:
      throw new BadRequestException();
  }
};

export const mockJwtServiceVerify = (token: string): AuthJwt => {
  switch (token) {
    case validOwnerUserToken:
      return {
        userId: ownerUser._id,
        username: 'mockUsername',
        orgName: 'shukun',
        orgId: 'mockOrgId',
        tokenType: 'jwt',
        accessToken: 'mockAccessToken',
        expiresIn: 0,
      };
    case validCooUserToken:
      return {
        userId: cooUser._id,
        username: 'mockUsername',
        orgName: 'shukun',
        orgId: 'mockOrgId',
        tokenType: 'jwt',
        accessToken: 'mockAccessToken',
        expiresIn: 0,
      };
    case validCfoUserToken:
      return {
        userId: cfoUser._id,
        username: 'mockUsername',
        orgName: 'shukun',
        orgId: 'mockOrgId',
        tokenType: 'jwt',
        accessToken: 'mockAccessToken',
        expiresIn: 0,
      };
    case invalidOrgNameToken:
      return {
        userId: ownerUser._id,
        username: 'mockUsername',
        orgName: 'b_org',
        orgId: 'mockOrgId',
        tokenType: 'jwt',
        accessToken: 'mockAccessToken',
        expiresIn: 0,
      };
    default:
      throw new Error();
  }
};

export const mockSecurityServiceGetGrantList = async (): Promise<
  RoleSchema[]
> => {
  return [
    {
      name: AccessInternalRoles.Owner,
      label: AccessInternalRoles.Owner,
      permissions: [],
    },
    {
      name: AccessInternalRoles.Anonymous,
      label: AccessInternalRoles.Anonymous,
      permissions: [
        'webhook:workflow_public',
        'source:products:read',
        'source:products:update',
        'source:products:delete',
      ],
    },
    {
      name: cooRole,
      label: cooRole,
      permissions: [
        'source:orders:create',
        'source:orders:read',
        'source:orders:update',
        'source:orders:delete',
        'webhook:workflow_name',
        'developer:codebase',
      ],
    },
    {
      name: cfoRole,
      label: cfoRole,
      permissions: [
        'source:payments:read',
        'source:payments:update',
        'source:payments:delete',
      ],
    },
  ];
};
