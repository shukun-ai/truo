import presenterData from './presenter.test.json';
import { presenterSchemaValidator } from './validate-presenter-schema';

describe('presenter format check.', () => {
  it('presenterSchemaValidator', () => {
    presenterSchemaValidator.validate(presenterData);
  });
});
