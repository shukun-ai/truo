import { inspectTestingValidate } from '../../testing-helpers/testing-validate-inspector';

import { validateWorkflowConfigurations } from './validate-workflow-configurations';

import configurationsData from './workflow-configurations.test.json';

describe('workflow-configurations', () => {
  it('validateWorkflowConfigurations', () => {
    const result = validateWorkflowConfigurations(configurationsData);
    inspectTestingValidate(result, validateWorkflowConfigurations);
    expect(result).toEqual(true);
  });
});
