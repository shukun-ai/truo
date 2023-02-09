import { Injectable } from '@nestjs/common';
import { SourceRequiredException } from '@shukun/exception';
import { MetadataElectron, MetadataSchema } from '@shukun/schema';

import { SourceServiceCreateDto } from '../app.type';

@Injectable()
export class SourceDtoConstraintService {
  public validateCreateConstraint(
    metadata: MetadataSchema,
    dto: SourceServiceCreateDto,
  ): void {
    metadata.electrons.forEach((electron) => {
      const value = dto[electron.name];
      this.validateRequired(value, electron);
    });
  }

  public validateUpdateConstraint(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: MetadataSchema,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dto: SourceServiceCreateDto,
  ): void {
    return;
  }

  private validateRequired(value: unknown, electron: MetadataElectron): void {
    if (electron.isRequired && !value) {
      throw new SourceRequiredException(
        '{{electronName}}: should be required.',
        {
          electronName: electron.name,
        },
      );
    }
  }
}
