import { BooleanElectron } from './boolean.electron';

describe('Boolean', () => {
  it('validateValue should be a boolean.', async () => {
    const field = new BooleanElectron();
    expect(field.validateValue(true)).toEqual([]);
    expect(field.validateValue(false)).toEqual([]);
    expect(field.validateValue('true')).toEqual(['should be a boolean.']);
  });
});
