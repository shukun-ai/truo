import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { PlayerSchema, RoleResourceType } from '@shukun/schema';

import { PlayerService } from '../../core/player.service';

import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

@Controller(`${RoleResourceType.Public}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('players/:playerName')
  async show(
    @Param('orgName') orgName: string,
    @Param('playerName') playerName: string,
  ): Promise<QueryResponse<PlayerSchema>> {
    const player = await this.playerService.findOne(orgName, playerName);

    return {
      value: player,
    };
  }
}
