import { widgetSchemaValidator } from '@shukun/validator';

import { textDefinition } from './text.definition';

describe('TextDefinition', () => {
  it('validate pass', () => {
    widgetSchemaValidator.validate(textDefinition);
  });
});
