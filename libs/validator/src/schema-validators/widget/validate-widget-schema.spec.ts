import { widgetSchemaValidator } from './validate-widget-schema';
import widgetData from './widget.test.json';

describe('widget format check.', () => {
  it('widgetSchemaValidator', () => {
    widgetSchemaValidator.validate(widgetData);
  });
});
