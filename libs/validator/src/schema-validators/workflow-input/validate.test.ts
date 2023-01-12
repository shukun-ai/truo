import { inspectTestingValidate } from '../../testing-helpers/testing-validate-inspector';

import { validateWorkflowInput } from './validate';
import inputData from './workflow-input.test.json';

describe('workflow-configurations', () => {
  it('validateWorkflowInput', () => {
    const result = validateWorkflowInput(inputData);
    inspectTestingValidate(result, validateWorkflowInput);
    expect(result).toEqual(true);
  });
});
