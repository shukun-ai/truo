import { BadRequestException, Injectable } from '@nestjs/common';
import { ElectronValueException } from '@shukun/exception';
import { MetadataElectron, MetadataSchema } from '@shukun/schema';

import { SourceServiceCreateDto } from '../app.type';

@Injectable()
export class SourceDtoConstraintService {
  validateCreateConstraint(
    metadata: MetadataSchema,
    dto: SourceServiceCreateDto,
  ): void {
    this.validateConstraint(metadata, dto, 'create');
  }

  validateUpdateConstraint(
    metadata: MetadataSchema,
    dto: SourceServiceCreateDto,
  ): void {
    this.validateConstraint(metadata, dto, 'update');
  }

  validateConstraint(
    metadata: MetadataSchema,
    dto: SourceServiceCreateDto,
    mode: 'create' | 'update',
  ): void {
    const initialErrorExceptions: string[] = [];

    const errorExceptions = metadata.electrons.reduce((previous, electron) => {
      const value = dto[electron.name];
      const requiredMessage = this.validateRequired(value, electron, mode);
      return [...previous, ...requiredMessage];
    }, initialErrorExceptions);

    if (errorExceptions.length > 0) {
      throw new BadRequestException(errorExceptions);
    }
  }

  validateRequired(
    value: unknown,
    electron: MetadataElectron,
    mode: 'create' | 'update',
  ): string[] {
    if (mode === 'create' && electron.isRequired && !value) {
      const exception = new ElectronValueException('should not be empty.');
      return [`${electron.label}: ${exception.message}`];
    }

    return [];
  }
}
