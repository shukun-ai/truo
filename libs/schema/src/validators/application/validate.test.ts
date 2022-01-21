import { validateApplicationSchema } from './validate';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const applicationData = require('./application.test.json');

describe('application', () => {
  it('validateApplicationSchema', () => {
    const result = validateApplicationSchema(applicationData);
    if (!result) {
      // Just convince for debug if validate gets errors
      console.log(validateApplicationSchema.errors);
    }
    expect(result).toEqual(true);
  });
});
