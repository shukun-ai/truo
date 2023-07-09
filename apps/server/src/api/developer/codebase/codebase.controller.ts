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
import { ApplicationSchema, RoleResourceType } from '@shukun/schema';
import {
  SystemDataCombination,
  SystemDataValidator,
  applicationSchemaValidator,
} from '@shukun/validator';

import { CompilerService } from '../../../compiler/compiler.service';
import { FlowService } from '../../../core/flow.service';
import { OrgService } from '../../../core/org.service';
import { ScheduleOrgOperatorService } from '../../../schedule/schedule-org-operator.service';
import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';

@Controller(`/${RoleResourceType.Developer}/:orgName/codebase`)
@UseInterceptors(QueryResponseInterceptor)
@ApiBearerAuth()
export class CodebaseController {
  constructor(
    private readonly orgService: OrgService,
    private readonly flowService: FlowService,
    private readonly compilerService: CompilerService,
    private readonly scheduleOrgOperatorService: ScheduleOrgOperatorService,
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
    @Param('orgName') orgName: string,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    @UploadedFile() file: { buffer: Buffer }, // Express.Multer.File
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

    applicationSchemaValidator.validate(plugin);

    const merged = new SystemDataCombination().combineApplicationLowCode(
      plugin,
    );

    const systemDataValidator = new SystemDataValidator();
    const check = systemDataValidator.check(merged);

    if (!check) {
      throw new BadRequestException(systemDataValidator.getErrors()?.join(','));
    }

    await this.orgService.updateCodebase(orgName, merged);

    await this.compileOrgFlowCodes(orgName);

    await this.bootstrapOrgSchedules(orgName);

    return {
      value: null,
    };
  }

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

  async bootstrapOrgSchedules(orgName: string): Promise<QueryResponse<null>> {
    this.scheduleOrgOperatorService.unregisterOrgSchedules(orgName);
    await this.scheduleOrgOperatorService.registerOrgSchedules(orgName);
    this.scheduleOrgOperatorService.startOrgSchedules(orgName);

    return {
      value: null,
    };
  }
}
