import {
  Controller,
  Get,
  UseInterceptors,
  Inject,
  Param,
} from '@nestjs/common';
import { InspectionResponse } from '@shukun/api';
import { RoleResourceType } from '@shukun/schema';

import { OrgService } from '../../../core/org.service';

import { QueryResponseInterceptor } from '../../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../../util/query/interfaces';

/**
 * @deprecated
 */
@Controller(`${RoleResourceType.Developer}/:orgName/inspection`)
@UseInterceptors(QueryResponseInterceptor)
export class InspectionController {
  @Inject() private readonly orgService!: OrgService;

  @Get()
  async index(
    @Param('orgName') orgName: string,
  ): Promise<QueryResponse<InspectionResponse>> {
    const application = await this.orgService.findCodebaseByOrgName(orgName);

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
