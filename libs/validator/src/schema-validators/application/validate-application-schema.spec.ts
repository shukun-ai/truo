import applicationData from './application.test.json';
import { applicationSchemaValidator } from './validate-application-schema';

describe('application', () => {
  it('applicationSchemaValidator', () => {
    applicationSchemaValidator.validate(applicationData);
  });
});
