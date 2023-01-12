import attachmentsData from './attachments.test.json';
import { attachmentsSchemaValidator } from './validate-attachments-schema';

describe('attachment', () => {
  it('attachmentsSchemaValidator', () => {
    attachmentsSchemaValidator.validate(attachmentsData);
  });
});
