import { validateWorkflowInput } from './validate';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const inputData = require('./workflow-input.test.json');

describe('workflow-configurations', () => {
  it('validateWorkflowInput', () => {
    const result = validateWorkflowInput(inputData);
    if (!result) {
      // Just convince for debug if validate gets errors
      console.error(validateWorkflowInput.errors);
    }
    expect(result).toEqual(true);
  });
});
