import {
  Controller,
  Inject,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  ApplicationSchema,
  mergeDependencies,
  SystemDataValidator,
  validateApplicationSchema
} from '@shukun/schema';
import { Express } from 'express';
import { QueryResponse } from '../../util/query/interfaces';

import { IDString } from '../../app.type';
import { OrgService } from '../../core/org.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { ResourceType } from '../api.type';
import { OrgNamePipe } from '../org/org-name.pipe';

@Controller(`/${ResourceType.Developer}/:orgName/codebase`)
@UseInterceptors(QueryResponseInterceptor)
@ApiBearerAuth()
export class CodebaseController {
  @Inject()
  private readonly orgService!: OrgService;

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
    @Param('orgName', OrgNamePipe) orgId: IDString,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    @UploadedFile() file: Express.Multer.File,
  ): Promise<QueryResponse<null>> {
    const fileString = file.buffer.toString();

    let plugin: ApplicationSchema | null = null;

    try {
      plugin = JSON.parse(fileString);
    } catch (error) {
      throw new BadRequestException(
        'The file is not a JSON, please upload a JSON file.',
      );
    }

    if (!plugin) {
      throw new BadRequestException('The file is not a standard format.');
    }

    const result = validateApplicationSchema(plugin);

    if (!result) {
      throw new BadRequestException(
        'The file is not validated by application JSON Schema.',
      );
    }

    const merged = mergeDependencies(plugin);

    const systemDataValidator = new SystemDataValidator();
    const check = systemDataValidator.check(merged);

    if (!check) {
      throw new BadRequestException(systemDataValidator.getErrors()?.join(','));
    }

    await this.orgService.updateCodebase(orgId, merged);

    return {
      value: null,
    };
  }
}
