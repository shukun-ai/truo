import { Injectable } from '@nestjs/common';
import { SourceNotFoundException } from '@shukun/exception';
import { PlayerSchema } from '@shukun/schema';

import { OrgService } from './org.service';

@Injectable()
export class PlayerService {
  constructor(private readonly orgService: OrgService) {}

  async findAll(orgName: string): Promise<Record<string, PlayerSchema>> {
    const players = await this.orgService.findPlayers(orgName);
    return players;
  }

  async findOne(orgName: string, playerName: string): Promise<PlayerSchema> {
    const players = await this.findAll(orgName);
    const player = players[playerName];
    if (!player) {
      throw new SourceNotFoundException(
        'Did not find specific player: {{playerName}}',
        {
          playerName,
        },
      );
    }
    return player;
  }

  async update(
    orgName: string,
    players: Record<string, PlayerSchema>,
  ): Promise<void> {
    await this.orgService.updatePlayers(orgName, players);
  }
}
