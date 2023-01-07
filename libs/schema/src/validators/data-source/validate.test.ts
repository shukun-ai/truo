import dataSourceTest from './data-source.test.json';
import { validateDataSourceSchema } from './validate';

describe('attachment', () => {
  it('validateDataSourceSchema', () => {
    const result = validateDataSourceSchema(dataSourceTest);
    if (!result) {
      // Just convince for debug if validate gets errors
      console.error(validateDataSourceSchema.errors);
    }
    expect(result).toEqual(true);
  });
});
