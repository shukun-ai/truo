import { ApplicationSchema, applicationSeedData } from '@shukun/schema';

import applicationData from '../schema-validators/application/application.test.json';
import { applicationSchemaValidator } from '../schema-validators/application/validate-application-schema';

import { SystemDataCombination } from './system-data-combination';
import { SystemDataValidator } from './system-data-validator';

describe('application', () => {
  it('merge initial application', () => {
    applicationSchemaValidator.validate(applicationSeedData);

    const merged = new SystemDataCombination().combineApplicationLowCode(
      applicationSeedData,
    );

    const systemDataValidator = new SystemDataValidator();
    const checked = systemDataValidator.check(merged);

    expect(checked).toEqual(true);
  });

  it('merge real application', () => {
    const merged = new SystemDataCombination().combineApplicationLowCode(
      applicationData as ApplicationSchema,
    );

    const systemDataValidator = new SystemDataValidator();
    const checked = systemDataValidator.check(merged);

    if (!checked) {
      console.error(systemDataValidator.getErrors());
    }

    expect(checked).toEqual(true);
  });
});
