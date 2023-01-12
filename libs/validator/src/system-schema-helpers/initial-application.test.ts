import { ApplicationSchema, initialApplicationSeedData } from '@shukun/schema';

import applicationData from '../schema-validators/application/application.test.json';
import { validateApplicationSchema } from '../schema-validators/application/validate';

import { SystemDataValidator } from './dependency-check';
import { mergeDependencies } from './dependency-merge';

describe('application', () => {
  it('merge initial application', () => {
    const result = validateApplicationSchema(initialApplicationSeedData);
    if (!result) {
      // Just convince for debug if validate gets errors
      console.error(validateApplicationSchema.errors);
    }

    expect(result).toEqual(true);

    const merged = mergeDependencies(
      initialApplicationSeedData as ApplicationSchema,
    );

    const systemDataValidator = new SystemDataValidator();
    const checked = systemDataValidator.check(merged);

    expect(checked).toEqual(true);
  });

  it('merge real application', () => {
    const merged = mergeDependencies(applicationData as ApplicationSchema);

    const systemDataValidator = new SystemDataValidator();
    const checked = systemDataValidator.check(merged);

    if (!checked) {
      console.error(systemDataValidator.getErrors());
    }

    expect(checked).toEqual(true);
  });
});
