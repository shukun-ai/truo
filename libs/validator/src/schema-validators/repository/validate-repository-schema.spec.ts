import repositoryData from './repository.test.json';
import { repositorySchemaValidator } from './validate-repository-schema';

describe('repository format check.', () => {
  it('repositorySchemaValidator', () => {
    repositorySchemaValidator.validate(repositoryData);
  });
});
