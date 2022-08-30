import { BadRequestException } from '@nestjs/common';
import { AccessControl } from 'accesscontrol';
import { Request } from 'express';

import { ResourceNodes } from '../../api/authorization/authorization.interface';

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
  resourceNodes: ResourceNodes,
): AccessActionType {
  if (!resourceNodes.resourceFunction) {
    return getLegendAccessActionType(resourceNodes.method);
  } else {
    return getAllPostAccessActionType(
      resourceNodes.method,
      resourceNodes.resourceFunction,
    );
  }
}

export function getAllPostAccessActionType(
  method: ResourceNodes['method'],
  resourceFunction: NonNullable<ResourceNodes['resourceFunction']>,
) {
  if (method === 'POST') {
    if (['metadata', 'query'].includes(resourceFunction)) {
      return AccessActionType.Read;
    }
    if (['create'].includes(resourceFunction)) {
      return AccessActionType.Create;
    }

    if (
      ['update', 'add-to-many', 'remove-from-many', 'increase'].includes(
        resourceFunction,
      )
    ) {
      return AccessActionType.Update;
    }

    if (['delete'].includes(resourceFunction)) {
      return AccessActionType.Delete;
    }
  }

  throw new BadRequestException(
    'method 和 resourceFunction 均不匹配，无法解析权限。',
  );
}

export function getLegendAccessActionType(method: ResourceNodes['method']) {
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
