import { widgetSchemaValidator } from '@shukun/validator';

import { inputDefinition } from './input.definition';

describe('InputDefinition', () => {
  it('validate pass', () => {
    widgetSchemaValidator.validate(inputDefinition);
  });
});
