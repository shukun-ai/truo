import { BadRequestException } from '@nestjs/common';
import { AccessControl } from 'accesscontrol';
import { Request } from 'express';

import { AccessActionRange, AccessActionType, UrlNodes } from '../interfaces';

export function parseToken(authorization: string | undefined): string | null {
  if (!authorization) {
    return null;
  }

  const token = authorization.substring(7);

  if (token === '') {
    return null;
  }

  return token;
}

export function getUrlNodes(request: Request): UrlNodes {
  const originalUrl = request.originalUrl;

  const [path] = originalUrl.split('?');

  const [
    ,
    apiPrefix,
    apiVersion,
    apiType,
    orgName,
    sourceName,
    sourceId,
    sourceFunction,
  ] = path.split('/');

  return {
    apiPrefix,
    apiVersion,
    apiType,
    orgName,
    sourceName,
    sourceId,
    sourceFunction,
  };
}

export const createAccessPermission = (
  access: AccessControl,
  hasRoleNames: string[],
  targetActionType: AccessActionType,
  targetResource: string,
) => {
  return (targetActionRange: AccessActionRange) => {
    return access.permission({
      role: hasRoleNames,
      action: `${targetActionType}:${targetActionRange}`,
      resource: targetResource,
    });
  };
};

export function getAccessActionType(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
): AccessActionType {
  switch (method) {
    case 'GET':
      return AccessActionType.Read;
    case 'POST':
      return AccessActionType.Create;
    case 'PUT':
      return AccessActionType.Update;
    case 'DELETE':
      return AccessActionType.Delete;
    default:
      throw new BadRequestException(`我们暂未支持 ${method} 类型`);
  }
}
