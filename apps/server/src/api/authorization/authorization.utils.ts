import { BadRequestException } from '@nestjs/common';
import * as URLParse from 'url-parse';

import { ResourceType } from '../api.type';

import { ResourceNodes } from './authorization.interface';

export function getResourceNodes(method: string, uri: string): ResourceNodes {
  const url = new URLParse(uri);

  const [, , , resourceType, orgName, resourceName, resourceId] =
    url.pathname.split('/');

  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
    throw new BadRequestException('请求类型不正确。');
  }

  if (!Object.values(ResourceType).includes(resourceType as ResourceType)) {
    throw new BadRequestException('接口类型不正确。');
  }

  return {
    method: method as 'GET' | 'POST' | 'PUT' | 'DELETE',
    resourceType: resourceType as ResourceType,
    orgName,
    resourceName,
    resourceId,
  };
}
