import { inspectTestingValidate } from '../../testing-helpers/testing-validate-inspector';

import applicationData from './application.test.json';
import { validateApplicationSchema } from './validate-application-schema';

describe('application', () => {
  it('validateApplicationSchema', () => {
    const result = validateApplicationSchema(applicationData);
    inspectTestingValidate(result, validateApplicationSchema);
    expect(result).toEqual(true);
  });
});
