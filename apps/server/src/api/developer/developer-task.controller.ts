import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { TaskSchema, RoleResourceType } from '@shukun/schema';

import { ConnectorTaskService } from '../../core/connector/task.service';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

import { TaskCreateDto } from './internal/task-create.dto';

@Controller(`/${RoleResourceType.Developer}/:orgName`)
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
}
