import { cssVar } from '../styles/utilities';
import { CustomVariables } from '../styles/variables';

export const textDefinition = {
  tag: 'text',
  properties: {
    value: {
      type: 'string',
      label: 'Display Text',
    },
    color: {
      type: 'string',
      label: 'Text Color',
      defaultValue: cssVar(CustomVariables.bodyColor),
    },
    fontSize: {
      type: 'string',
      label: 'Text Size',
      defaultValue: cssVar(CustomVariables.fontSize),
    },
    fontStyle: {
      type: 'string',
      label: 'Display Text',
    },
    textAlign: {
      type: 'string',
      label: 'Display Text',
      defaultValue: cssVar(CustomVariables.bodyTextAlign),
    },
  },
} as const;
