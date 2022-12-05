import { validateHttpQuerySchema } from './validate';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpQueryData = require('./http-query.test.json');

describe('attachment', () => {
  it('validateHttpQuerySchema', () => {
    const result = validateHttpQuerySchema(httpQueryData);
    if (!result) {
      // Just convince for debug if validate gets errors
      console.error(validateHttpQuerySchema.errors);
    }
    expect(result).toEqual(true);
  });
});
