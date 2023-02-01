import { TypeException } from '@shukun/exception';

import { Differ } from '../differ/differ';
import { FlatMetadataSchema } from '../flat-metadata/flat-metadata.type';

import { Validator } from './validator';

describe('Validator', () => {
  describe('validate fieldType changes', () => {
    it('should return error, when change fieldType', () => {
      const left: FlatMetadataSchema = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'Text',
            isRequired: true,
          },
        },
      };
      const right: FlatMetadataSchema = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'SingleSelect',
            isRequired: true,
            options: [],
          },
        },
      };

      const differ = new Differ(left, right);
      const differences = differ.getDetail();

      expect(() => new Validator().validate(differences)).toThrow(
        new TypeException(
          'We do not allow to change fieldType in electron, please recover previous type, from {{atomName}}->{{electronName}}.',
          {
            atomName: 'devices',
            electronName: 'number',
          },
        ),
      );
      expect(
        new Validator().validate(differences, { disabled: true }),
      ).toBeUndefined();
    });
  });
});
