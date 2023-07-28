import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { TaskSchema, RoleResourceType } from '@shukun/schema';

import { ConnectorTaskService } from '../../core/connector/task.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

import { apiPrefix } from '../prefix';

import { TaskCreateDto, TaskRemoveDto } from './dto/task.dto';

@Controller(`${apiPrefix}/${RoleResourceType.Developer}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class DeveloperTaskController {
  constructor(private readonly connectorTaskService: ConnectorTaskService) {}

  @Post('query-task')
  async query(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<Record<string, TaskSchema>>> {
    const connector = await this.connectorTaskService.query(orgName);
    return {
      value: connector,
    };
  }

  @Post('upsert-task')
  async create(
    @Param('orgName') orgName: string,
    @Body() dto: TaskCreateDto,
  ): Promise<QueryResponse<null>> {
    await this.connectorTaskService.upsert(orgName, dto.taskName, dto.task);
    return {
      value: null,
    };
  }

  @Post('remove-task')
  async remove(
    @Param('orgName') orgName: string,
    @Body() dto: TaskRemoveDto,
  ): Promise<QueryResponse<null>> {
    await this.connectorTaskService.remove(orgName, dto.taskName);
    return {
      value: null,
    };
  }
}
