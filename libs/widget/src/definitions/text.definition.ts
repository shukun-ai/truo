import { cssVar } from '../styles/utilities';
import { CustomVariables } from '../styles/variables';

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
      widgetDefaultValue: cssVar(CustomVariables.bodyColor),
    },
    fontSize: {
      expectedType: 'string',
      editLabel: 'Text Size',
      editType: 'template',
      widgetDefaultValue: cssVar(CustomVariables.fontSize),
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
      widgetDefaultValue: cssVar(CustomVariables.bodyTextAlign),
    },
  },
  events: {},
} as const;
