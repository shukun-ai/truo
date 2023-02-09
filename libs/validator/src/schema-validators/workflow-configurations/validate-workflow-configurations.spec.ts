import { workflowConfigurationsSchemaValidator } from './validate-workflow-configurations';

import configurationsData from './workflow-configurations.test.json';

describe('workflow-configurations', () => {
  it('validateWorkflowConfigurations', () => {
    workflowConfigurationsSchemaValidator.validate(configurationsData);
  });
});
