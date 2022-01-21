import { validateWorkflowConfigurations } from './validate';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const configurationsData = require('./workflow-configurations.test.json');

describe('workflow-configurations', () => {
  it('validateWorkflowConfigurations', () => {
    const result = validateWorkflowConfigurations(configurationsData);
    if (!result) {
      // Just convince for debug if validate gets errors
      console.log(validateWorkflowConfigurations.errors);
    }
    expect(result).toEqual(true);
  });
});
