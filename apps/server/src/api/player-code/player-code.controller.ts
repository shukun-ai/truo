import {
  BadRequestException,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { PlayerSchema, RoleResourceType } from '@shukun/schema';
import { playerSchemaValidator } from '@shukun/validator';

import { PlayerService } from '../../core/player.service';

import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

@Controller(`${RoleResourceType.Developer}/:orgName/players-code`)
@UseInterceptors(QueryResponseInterceptor)
export class PlayerCodeController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async import(
    @Param('orgName') orgName: string,
    @UploadedFile() file: { buffer: Buffer },
  ): Promise<QueryResponse<null>> {
    const fileString = file.buffer.toString();

    let playerLowCode: { players: Record<string, PlayerSchema> } | null = null;

    try {
      playerLowCode = JSON.parse(fileString);
    } catch (error) {
      throw new BadRequestException(
        'The file is not a JSON, please upload a JSON file.',
      );
    }

    if (!playerLowCode) {
      throw new BadRequestException('The file is not a standard format.');
    }

    for (const player of Object.values(playerLowCode.players)) {
      playerSchemaValidator.validate(player);
    }

    await this.playerService.update(orgName, playerLowCode.players);

    return {
      value: null,
    };
  }
}
