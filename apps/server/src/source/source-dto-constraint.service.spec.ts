import { BadRequestException } from '@nestjs/common';
import {
  MetadataElectron,
  MetadataFieldType,
  MetadataSchema,
} from '@shukun/schema';

import { SourceDtoConstraintService } from './source-dto-constraint.service';

describe('SourceDtoConstraintService', () => {
  describe('validateCreateConstraint', () => {
    const sourceDtoConstraintService = new SourceDtoConstraintService();
    const metadata: MetadataSchema = {
      name: 'mock',
      label: 'Mock',
      electrons: [
        {
          name: 'mock',
          label: 'Mock',
          fieldType: MetadataFieldType.Text,
          isRequired: false,
        },
      ],
    };
    const dto = {};
    const output = sourceDtoConstraintService.validateCreateConstraint(
      metadata,
      dto,
    );
    expect(output).toEqual(undefined);
  });

  describe('validateUpdateConstraint', () => {
    const sourceDtoConstraintService = new SourceDtoConstraintService();
    const metadata: MetadataSchema = {
      name: 'mock',
      label: 'Mock',
      electrons: [
        {
          name: 'mock',
          label: 'Mock',
          fieldType: MetadataFieldType.Text,
          isRequired: true,
        },
      ],
    };
    const dto = {};
    const output = sourceDtoConstraintService.validateUpdateConstraint(
      metadata,
      dto,
    );
    expect(output).toEqual(undefined);
  });

  describe('validateConstraint', () => {
    it('should pass, when is not required.', () => {
      const sourceDtoConstraintService = new SourceDtoConstraintService();
      const metadata: MetadataSchema = {
        name: 'mock',
        label: 'Mock',
        electrons: [
          {
            name: 'mock',
            label: 'Mock',
            fieldType: MetadataFieldType.Text,
            isRequired: false,
          },
        ],
      };
      const dto = {};
      const mode = 'create';
      const output = sourceDtoConstraintService.validateConstraint(
        metadata,
        dto,
        mode,
      );
      expect(output).toEqual(undefined);
    });

    it('should throw error, when is required.', () => {
      const sourceDtoConstraintService = new SourceDtoConstraintService();
      const metadata: MetadataSchema = {
        name: 'mock',
        label: 'Mock',
        electrons: [
          {
            name: 'mock',
            label: 'Mock',
            fieldType: MetadataFieldType.Text,
            isRequired: true,
          },
        ],
      };
      const dto = {};
      const mode = 'create';

      expect(() =>
        sourceDtoConstraintService.validateConstraint(metadata, dto, mode),
      ).toThrow(new BadRequestException(['Mock: should not be empty.']));
    });
  });

  describe('validateRequired', () => {
    it('should pass, when create and is not required.', () => {
      const sourceDtoConstraintService = new SourceDtoConstraintService();
      const value = undefined;
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isRequired: false,
      };
      const mode = 'create';
      const output = sourceDtoConstraintService.validateRequired(
        value,
        electron,
        mode,
      );
      expect(output).toEqual([]);
    });

    it('should throw error, when create and is required.', () => {
      const sourceDtoConstraintService = new SourceDtoConstraintService();
      const value = undefined;
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
      };
      const mode = 'create';
      const output = sourceDtoConstraintService.validateRequired(
        value,
        electron,
        mode,
      );
      expect(output).toEqual(['Mock: should not be empty.']);
    });

    it('should pass, when update and is required.', () => {
      const sourceDtoConstraintService = new SourceDtoConstraintService();
      const value = undefined;
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
      };
      const mode = 'update';
      const output = sourceDtoConstraintService.validateRequired(
        value,
        electron,
        mode,
      );
      expect(output).toEqual([]);
    });
  });
});
