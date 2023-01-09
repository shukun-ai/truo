import { ElectronValueException } from '@shukun/exception';

import { DateTimeField } from './date-time.field';

describe('date-time.field', () => {
  describe('validateValue', () => {
    it('validateValue should be a data.', () => {
      const field = new DateTimeField();
      expect(field.validateValue('2020-02-29T14:39:00.392Z')).toEqual([]);
    });

    it('Should return error messages, when it is not a strict iso date.', () => {
      const field = new DateTimeField();
      expect(field.validateValue('2020-02-29 14:39:00')).toEqual([
        new ElectronValueException(
          'should be ISO8601 date, try to use "date.toISOString()."',
        ),
      ]);
    });

    it('Should return error messages, when use date.toString().', () => {
      const field = new DateTimeField();
      expect(
        field.validateValue(
          'Sun Jan 08 2023 12:53:21 GMT+0800 (China Standard Time)',
        ),
      ).toEqual([
        new ElectronValueException(
          'should be ISO8601 date, try to use "date.toISOString()."',
        ),
      ]);
    });

    it('Should return error messages, when it is not an iso date.', () => {
      const field = new DateTimeField();
      expect(field.validateValue('20')).toEqual([
        new ElectronValueException(
          'should be ISO8601 date, try to use "date.toISOString()."',
        ),
      ]);
    });
  });
});
