import { Injectable } from '@nestjs/common';
import { EnvironmentSchema, DataSourceEnvironments } from '@shukun/schema';

import { DataSourceService } from './data-source.service';

import { OrgService } from './org.service';

@Injectable()
export class EnvironmentService {
  constructor(
    private readonly orgService: OrgService,
    private readonly dataSourceService: DataSourceService,
  ) {}

  async findAll(orgName: string): Promise<EnvironmentSchema[]> {
    const application = await this.orgService.findCodebaseByOrgName(orgName);
    return application.environments ?? [];
  }

  async findAllEnvironments(orgName: string): Promise<DataSourceEnvironments> {
    const environments = await this.findAll(orgName);
    const dataSource = await this.dataSourceService.findAll(orgName);
    return this.mergeEnvironments(environments, dataSource.environments ?? {});
  }

  async findPublicEnvironments(
    orgName: string,
  ): Promise<DataSourceEnvironments> {
    const environments = await this.findAll(orgName);
    const dataSource = await this.dataSourceService.findAll(orgName);
    return this.mergeEnvironments(
      environments.filter((environment) => environment.isPublic),
      dataSource.environments ?? {},
    );
  }

  protected mergeEnvironments(
    environments: EnvironmentSchema[],
    dataSourceEnvironments: Record<string, string>,
  ): DataSourceEnvironments {
    const environmentDictionary: DataSourceEnvironments = {};

    environments
      .filter((environment) => environment.isPublic)
      .forEach((environment) => {
        environmentDictionary[environment.name] =
          typeof dataSourceEnvironments[environment.name] === 'string'
            ? dataSourceEnvironments[environment.name]
            : environment.value;
      });

    return environmentDictionary;
  }
}
