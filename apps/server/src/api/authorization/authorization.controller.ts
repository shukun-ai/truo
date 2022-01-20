import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeaders } from '@nestjs/swagger';
import { Request } from 'express';
import { get } from 'lodash';
import { parseToken } from '../../identity/utils/security.utils';
import { QueryResponse } from '../../util/query/interfaces';

import { ResourceType } from '../api.type';

import { AuthorizationService } from './authorization.service';
import { getResourceNodes } from './authorization.utils';

@Controller(`${ResourceType.Public}/any/authorization`)
@ApiBearerAuth()
export class AuthorizationController {
  @Inject()
  private readonly authorizationService: AuthorizationService;

  @Get('/validate')
  @ApiHeaders([
    {
      name: 'x-forwarded-method',
    },
    {
      name: 'x-forwarded-uri',
    },
  ])
  async validate(@Req() req: Request): Promise<QueryResponse<boolean>> {
    const method = get(req.headers, 'x-forwarded-method');
    const uri = get(req.headers, 'x-forwarded-uri');

    if (typeof method !== 'string' || typeof uri !== 'string') {
      throw new BadRequestException(
        '缺少 x-forwarded-method 和 x-forwarded-uri。',
      );
    }

    // Hack for CORS
    if (method === 'OPTIONS') {
      return {
        value: true,
      };
    }

    const authorization = req.headers.authorization;

    const resourceNodes = getResourceNodes(method, uri);
    const token = parseToken(authorization);
    await this.authorizationService.validateResource(resourceNodes, token);

    return {
      value: true,
    };
  }
}
