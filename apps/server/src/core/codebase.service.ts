import { Injectable } from '@nestjs/common';
import {
  ApplicationSchema,
  MetadataElectron,
  MetadataReviseSchema,
} from '@shukun/schema';

import { OrgService } from './org.service';
import { SourceService } from './source/source.service';

@Injectable()
export class CodebaseService {
  constructor(
    private readonly orgService: OrgService,
    private readonly sourceService: SourceService,
  ) {}

  async update(orgName: string, codebase: ApplicationSchema) {
    await this.sourceService.push(
      orgName,
      this.toMetadataReviseSchema(codebase),
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
}
