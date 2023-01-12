import { workflowInputSchemaValidator } from './validate-workflow-input';
import inputData from './workflow-input.test.json';

describe('workflowInputSchemaValidator', () => {
  it('workflowInputSchemaValidator', () => {
    workflowInputSchemaValidator.validate(inputData);
  });
});
