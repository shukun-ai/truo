import { DateTimeField } from './date-time.field';

describe('date-time.field', () => {
  describe('validateValue', () => {
    it('validateValue should be a data.', async () => {
      const field = new DateTimeField();
      // 2023-01-08T03:21:47.392Z
      expect(field.validateValue('2020-02-29T14:39:00.392Z')).toEqual([]);
    });

    it('Should return error messages, when it is not a strict iso date.', async () => {
      const field = new DateTimeField();
      expect(field.validateValue('2020-02-29 14:39:00')).toEqual([
        'The date format should be ISO8601, try to use ".toISOString()."',
      ]);
    });

    it('Should return error messages, when use date.toString().', async () => {
      const field = new DateTimeField();
      expect(
        field.validateValue(
          'Sun Jan 08 2023 12:53:21 GMT+0800 (China Standard Time)',
        ),
      ).toEqual([
        'The date format should be ISO8601, try to use ".toISOString()."',
      ]);
    });

    it('Should return error messages, when it is not an iso date.', async () => {
      const field = new DateTimeField();
      expect(field.validateValue('20')).toEqual([
        'The date format should be ISO8601, try to use ".toISOString()."',
      ]);
    });
  });
});
