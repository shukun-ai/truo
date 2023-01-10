import { ElectronValueException } from '@shukun/exception';

import { BooleanField } from './boolean.field';

describe('boolean.field', () => {
  it('validateValue should be a boolean.', async () => {
    const field = new BooleanField();
    expect(field.validateValue(true)).toEqual([]);
    expect(field.validateValue(false)).toEqual([]);
    expect(field.validateValue('true')).toEqual([
      new ElectronValueException('should be a boolean type.'),
    ]);
  });
});
