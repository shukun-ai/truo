import { inspectTestingValidate } from '../../testing-helpers/testing-validate-inspector';

import attachmentsData from './attachments.test.json';
import { validateAttachmentsSchema } from './validate';

describe('attachment', () => {
  it('validateAttachmentsSchema', () => {
    const result = validateAttachmentsSchema(attachmentsData);
    inspectTestingValidate(result, validateAttachmentsSchema);
    expect(result).toEqual(true);
  });
});
