import { FromDefinition } from '../core/from-definition';
import { CustomVariables } from '../styles/variables';

/**
 * Why do we need to make duplication.
 * @see {@link https://github.com/ThomasAribart/json-schema-to-ts/blob/master/documentation/FAQs/does-json-schema-to-ts-work-on-json-file-schemas.md}
 */
export const textDefinition = {
  tag: 'text',
  properties: {
    value: {
      expectedType: 'string',
      editLabel: 'Display Text',
      editType: 'template',
    },
    color: {
      expectedType: 'string',
      editLabel: 'Text Color',
      editType: 'template',
      widgetDefaultValue: CustomVariables.bodyColor,
    },
    fontSize: {
      expectedType: 'string',
      editLabel: 'Text Size',
      editType: 'template',
      widgetDefaultValue: CustomVariables.fontSize,
    },
    fontStyle: {
      expectedType: 'string',
      editLabel: 'Display Text',
      editType: 'template',
    },
    textAlign: {
      expectedType: 'string',
      editLabel: 'Display Text',
      editType: 'template',
      widgetDefaultValue: CustomVariables.bodyTextAlign,
    },
  },
  events: {},
} as const;

export type TextDefinition = FromDefinition<typeof textDefinition>;
