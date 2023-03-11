import { FromDefinition } from '../core/from-definition';

import textDefinitionJson from './text.definition.json';

/**
 * Why do we need to make duplication.
 * @see {@link https://github.com/ThomasAribart/json-schema-to-ts/blob/master/documentation/FAQs/does-json-schema-to-ts-work-on-json-file-schemas.md}
 */
export const textDefinition = textDefinitionJson as {
  $schema: '../../../schema/src/json-schemas/widget.schema.json';
  tag: 'sk-text';
  properties: {
    value: {
      expectedType: 'string';
      editLabel: 'Display Text';
      editType: 'template';
    };
  };
  events: {
    //
  };
};

export type TextDefinition = FromDefinition<typeof textDefinition>;
