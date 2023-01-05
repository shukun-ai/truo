import { DateTimeElectron } from './date-time.electron';

describe('date-time', () => {
  it('validateValue should be a date.', async () => {
    const field = new DateTimeElectron();
    // TODO add use ISO Date for test.
    expect(field.validateValue('2020-02-29 14:39:00')).toEqual([]);
    expect(field.validateValue('20')).toEqual([
      'should be a correct data, e.g. YYYY-MM-DD HH:mm:ss.',
    ]);
  });
});
