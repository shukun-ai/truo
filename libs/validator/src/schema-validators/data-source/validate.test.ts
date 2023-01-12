import { inspectTestingValidate } from '../../testing-helpers/testing-validate-inspector';

import dataSourceTest from './data-source.test.json';
import { validateDataSourceSchema } from './validate';

describe('attachment', () => {
  it('validateDataSourceSchema', () => {
    const result = validateDataSourceSchema(dataSourceTest);
    inspectTestingValidate(result, validateDataSourceSchema);
    expect(result).toEqual(true);
  });
});
