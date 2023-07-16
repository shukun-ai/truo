import { Injectable } from '@nestjs/common';
import {
  ApplicationSchema,
  EnvironmentSchema,
  MetadataElectron,
  MetadataReviseSchema,
} from '@shukun/schema';

import { EnvironmentDao } from './dao/environment.dao';
import { OrgService } from './org.service';
import { SourceService } from './source/source.service';

@Injectable()
export class CodebaseService {
  constructor(
    private readonly orgService: OrgService,
    private readonly sourceService: SourceService,
    private readonly environmentDao: EnvironmentDao,
  ) {}

  async update(orgName: string, codebase: ApplicationSchema) {
    await this.sourceService.push(
      orgName,
      this.toMetadataReviseSchema(codebase),
    );
    await this.environmentDao.saveAll(
      orgName,
      this.toEnvironmentReviseSchema(codebase),
    );
    return await this.orgService.updateCodebase(orgName, codebase);
  }

  async findByOrgName(orgName: string): Promise<ApplicationSchema> {
    return await this.orgService.findCodebaseByOrgName(orgName);
  }

  private toMetadataReviseSchema(
    codebase: ApplicationSchema,
  ): Record<string, MetadataReviseSchema> {
    const { metadata } = codebase;

    if (!metadata) {
      return {};
    }

    return metadata.reduce(
      (total, atom) => ({
        ...total,
        [atom.name]: {
          ...atom,
          electrons: this.toElectronRevise(atom.electrons),
        },
      }),
      {} as Record<string, MetadataReviseSchema>,
    );
  }

  private toElectronRevise(
    electrons: MetadataElectron[],
  ): Record<string, MetadataElectron> {
    return electrons.reduce(
      (total, electron) => ({
        ...total,
        [electron.name]: electron,
      }),
      {} as Record<string, MetadataElectron>,
    );
  }

  private toEnvironmentReviseSchema(
    codebase: ApplicationSchema,
  ): Record<string, EnvironmentSchema> {
    const { environments } = codebase;
    if (!environments) {
      return {};
    }
    return environments.reduce(
      (total, environment) => ({
        ...total,
        [environment.name]: environment,
      }),
      {} as Record<string, EnvironmentSchema>,
    );
  }
}
