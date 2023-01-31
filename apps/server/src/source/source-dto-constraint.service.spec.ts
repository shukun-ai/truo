import { SourceRequiredException } from '@shukun/exception';
import { MetadataSchema } from '@shukun/schema';

import { SourceDtoConstraintService } from './source-dto-constraint.service';

describe('SourceDtoConstraintService', () => {
  const createMetadata = (params: { isRequired: boolean }) => {
    const metadata: MetadataSchema = {
      name: 'mock',
      label: 'Mock',
      electrons: [
        {
          name: 'mock',
          label: 'Mock',
          fieldType: 'Text',
          isRequired: params.isRequired,
        },
      ],
    };
    return metadata;
  };

  describe('validateCreateConstraint', () => {
    it('should pass, then not required.', () => {
      const sourceDtoConstraintService = new SourceDtoConstraintService();
      const metadata = createMetadata({ isRequired: false });
      const dto = {};
      const output = sourceDtoConstraintService.validateCreateConstraint(
        metadata,
        dto,
      );
      expect(output).toBeUndefined();
    });

    it('should throw error, then need required.', () => {
      const sourceDtoConstraintService = new SourceDtoConstraintService();
      const metadata = createMetadata({ isRequired: true });
      const dto = {};
      expect(() =>
        sourceDtoConstraintService.validateCreateConstraint(metadata, dto),
      ).toThrow(
        new SourceRequiredException('{{electronName}}: should be empty.', {
          electronName: 'mock',
        }),
      );
    });
  });

  describe('validateUpdateConstraint', () => {
    it('should pass, when not required.', () => {
      const sourceDtoConstraintService = new SourceDtoConstraintService();
      const metadata = createMetadata({ isRequired: false });
      const dto = {};
      const output = sourceDtoConstraintService.validateUpdateConstraint(
        metadata,
        dto,
      );
      expect(output).toBeUndefined();
    });

    it('should pass, when need required.', () => {
      const sourceDtoConstraintService = new SourceDtoConstraintService();
      const metadata = createMetadata({ isRequired: true });
      const dto = {};
      const output = sourceDtoConstraintService.validateUpdateConstraint(
        metadata,
        dto,
      );
      expect(output).toBeUndefined();
    });
  });
});
