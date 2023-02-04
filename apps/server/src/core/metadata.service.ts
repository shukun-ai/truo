import { BadRequestException, Injectable } from '@nestjs/common';
import { MetadataSchema } from '@shukun/schema';

import { OrgService } from './org.service';

@Injectable()
export class MetadataService {
  constructor(private readonly orgService: OrgService) {}

  async getAll(orgName: string): Promise<MetadataSchema[]> {
    const application = await this.orgService.findCodebaseByOrgName(orgName);
    return application.metadata ?? [];
  }

  async getMetadataByName(
    orgName: string,
    atomName: string,
  ): Promise<MetadataSchema> {
    const metadata = await this.getAll(orgName);

    if (metadata.length === 0) {
      throw new BadRequestException(
        `${orgName} 组织名下没有找到 metadata 数据。`,
      );
    }

    const atom = metadata.find((atom) => atom.name === atomName);

    if (!atom) {
      throw new BadRequestException(
        `${orgName} 组织名下没有找到 ${atomName} 模型，可能是模型名称错误。`,
      );
    }

    return atom;
  }

  async getMigrated(orgName: string): Promise<MetadataSchema[]> {
    return [];
  }
}
