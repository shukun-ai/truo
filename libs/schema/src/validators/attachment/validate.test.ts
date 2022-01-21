import { validateAttachmentsSchema } from './validate';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const attachmentsData = require('./attachments.test.json');

describe('attachment', () => {
  it('validateAttachmentsSchema', () => {
    const result = validateAttachmentsSchema(attachmentsData);
    if (!result) {
      // Just convince for debug if validate gets errors
      console.log(validateAttachmentsSchema.errors);
    }
    expect(result).toEqual(true);
  });
});
