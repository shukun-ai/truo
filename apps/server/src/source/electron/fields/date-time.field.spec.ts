import { DateTimeField } from './date-time.field';

describe('date-time.field', () => {
  it('validateValue should be a data.', async () => {
    const field = new DateTimeField();
    expect(field.validateValue('2020-02-29 14:39:00')).toEqual([]);
    expect(field.validateValue('20')).toEqual([
      'should be a correct data, e.g. YYYY-MM-DD HH:mm:ss.',
    ]);
  });
});
