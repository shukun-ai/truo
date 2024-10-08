import { Inject, Injectable } from '@nestjs/common';

import { SourceServiceCreateDto } from '../../app.type';
import { SourceService } from '../../source/source.service';

@Injectable()
export class SourceAccessControlService {
  @Inject()
  private readonly sourceService!: SourceService<unknown>;

  async filterDto(
    orgName: string,
    atomName: string,
    dto: SourceServiceCreateDto,
  ): Promise<SourceServiceCreateDto> {
    const metadata = await this.sourceService.getMetadata(orgName, atomName);

    const newDto: SourceServiceCreateDto = {};

    metadata.electrons.forEach((electron) => {
      const value = dto[electron.name];

      // TODO add attributes acl control later
      // TODO get rid of FieldType.ManyToMany value in source module.
      // TODO remove below logic with removing Owner and IsSystem.
      if (
        typeof value !== 'undefined' &&
        !['Owner', 'IsSystem'].includes(electron.fieldType)
      ) {
        newDto[electron.name] = value;
      }
    });

    return newDto;
  }
}
