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
import { PresenterSchema, RoleResourceType } from '@shukun/schema';
import { presenterSchemaValidator } from '@shukun/validator';

import { PresenterService } from '../../../core/presenter.service';

import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';

@Controller(`${RoleResourceType.Developer}/:orgName/presenters-code`)
@UseInterceptors(QueryResponseInterceptor)
export class PresenterCodeController {
  constructor(private readonly presenterService: PresenterService) {}

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

    let presenterLowCode: {
      presenters: Record<string, PresenterSchema>;
    } | null = null;

    try {
      presenterLowCode = JSON.parse(fileString);
    } catch (error) {
      throw new BadRequestException(
        'The file is not a JSON, please upload a JSON file.',
      );
    }

    if (!presenterLowCode) {
      throw new BadRequestException('The file is not a standard format.');
    }

    for (const presenter of Object.values(presenterLowCode.presenters)) {
      presenterSchemaValidator.validate(presenter);
    }

    await this.presenterService.update(orgName, presenterLowCode.presenters);

    return {
      value: null,
    };
  }
}
