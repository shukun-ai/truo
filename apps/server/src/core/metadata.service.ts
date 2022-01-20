import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MetadataSchema } from '@shukun/schema';

import { OrgService } from './org.service';

@Injectable()
export class MetadataService {
  @Inject() private readonly orgService!: OrgService;

  async getMetadataByName(
    orgName: string,
    atomName: string,
  ): Promise<MetadataSchema> {
    const application = await this.orgService.findCodebaseByOrgName(orgName);

    if (!application.metadata) {
      throw new BadRequestException(
        `${orgName} 组织名下没有找到 metadata 数据。`,
      );
    }

    const atom = application.metadata.find((atom) => atom.name === atomName);

    if (!atom) {
      throw new BadRequestException(
        `${orgName} 组织名下没有找到 ${atomName} 模型，可能是模型名称错误。`,
      );
    }

    return atom;
  }
}
