import dataSourceTest from './data-source.test.json';
import { dataSourceSchemaValidator } from './validate-data-source-schema';

describe('attachment', () => {
  it('dataSourceSchemaValidator', () => {
    dataSourceSchemaValidator.validate(dataSourceTest);
  });
});
