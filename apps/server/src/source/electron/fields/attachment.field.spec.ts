import { ElectronValueException } from '../../../exceptions/electron-value-exception';

import { AttachmentField } from './attachment.field';

describe('attachment.field', () => {
  it('validateValue', async () => {
    const field = new AttachmentField();
    const wrongValue = {
      mime: 'image/png',
      path: 'example',
      size: 1024,
      name: 'Example Origin Name',
    };
    const wrongValue2 = {
      mime: 'image/png',
      path: 'example',
      size: 1024,
    };
    const rightValue = [wrongValue];
    expect(field.validateValue(wrongValue)).toEqual([
      new ElectronValueException('should be a attachment format.'),
    ]);
    expect(field.validateValue(wrongValue2)).toEqual([
      new ElectronValueException('should be a attachment format.'),
    ]);
    expect(field.validateValue(rightValue)).toEqual([]);
  });
});
