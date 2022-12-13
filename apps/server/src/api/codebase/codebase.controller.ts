import {
  Controller,
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
  RoleResourceType,
  SystemDataValidator,
  validateApplicationSchema,
} from '@shukun/schema';
import { Express } from 'express';

import { IDString } from '../../app.type';
import { CompilerService } from '../../compiler/compiler.service';
import { FlowService } from '../../core/flow.service';
import { OrgService } from '../../core/org.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';
import { OrgNamePipe } from '../org/org-name.pipe';

@Controller(`/${RoleResourceType.Developer}/:orgName/codebase`)
@UseInterceptors(QueryResponseInterceptor)
@ApiBearerAuth()
export class CodebaseController {
  constructor(
    private readonly orgService: OrgService,
    private readonly flowService: FlowService,
    private readonly compilerService: CompilerService,
  ) {}

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
      const errorMessage = JSON.stringify(validateApplicationSchema.errors);
      throw new BadRequestException(
        `The file is not validated by application JSON Schema: ${errorMessage}`,
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

  @Post()
  async compileOrgFlowCodes(orgName: string): Promise<QueryResponse<null>> {
    const flows = await this.flowService.findAll(orgName);
    const flowOrgCompiledCodes = await this.compilerService.compileFlows(flows);

    await this.orgService.updateFlowOrgCompiledCodes(
      orgName,
      flowOrgCompiledCodes,
    );

    return {
      value: null,
    };
  }
}
