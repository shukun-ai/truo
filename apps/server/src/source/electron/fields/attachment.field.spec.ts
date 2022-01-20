import { AttachmentField } from './attachment.field';

describe('attachment.field', () => {
  it('validateValue should pass joi.', async () => {
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
    expect(field.validateValue(wrongValue)).toEqual(['value 的格式不正确。']);
    expect(field.validateValue(wrongValue2)).toEqual(['value 的格式不正确。']);
    expect(field.validateValue(rightValue)).toEqual([]);
  });
});
