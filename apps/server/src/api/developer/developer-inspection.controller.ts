import { Controller, Get, UseInterceptors, Param } from '@nestjs/common';
import { InspectionResponse } from '@shukun/api';
import { RoleResourceType } from '@shukun/schema';

import { CodebaseService } from '../../core/codebase.service';

import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';
import { apiPrefix } from '../prefix';

/**
 * @deprecated
 */
@Controller(`${apiPrefix}/${RoleResourceType.Developer}/:orgName/inspection`)
@UseInterceptors(QueryResponseInterceptor)
export class DeveloperInspectionController {
  constructor(private readonly codebaseService: CodebaseService) {}

  @Get()
  async index(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<InspectionResponse>> {
    const application = await this.codebaseService.findByOrgName(orgName);

    return {
      value: {
        title: application.title,
        description: application.description,
        metadata: application.metadata?.map((metadata) => ({
          name: metadata.name,
          label: metadata.label,
          electrons: metadata.electrons,
        })),
        views: application.views?.map((view) => ({
          name: view.name,
          label: view.label,
          type: view.type,
          isVisible: view.isVisible,
          parentName: view.parentName,
          priority: view.priority,
        })),
        workflows: application.workflows?.map((workflow) => ({
          name: workflow.name,
          description: workflow.description,
          isEnabledWebhook: workflow.isEnabledWebhook,
          validations: workflow.validations,
        })),
        roles: application.roles?.map((role) => ({
          name: role.name,
          label: role.label,
        })),
      },
    };
  }
}
