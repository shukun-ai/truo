export const inputDefinition = {
  tag: 'input',
  properties: {
    value: {
      type: 'string',
      label: 'Value Binding',
    },
    placeholder: {
      type: 'string',
      label: 'Placeholder',
    },
    disabled: {
      type: 'boolean',
      label: 'disabled',
    },
    readonly: {
      type: 'boolean',
      label: 'readonly',
    },
    hidden: {
      type: 'boolean',
      label: 'hidden:',
    },
    label: {
      type: 'string',
      label: 'Label',
    },
    labelCaption: {
      type: 'string',
      label: 'Caption',
    },
    labelHidden: {
      type: 'boolean',
      label: 'Hide Label',
    },
    labelPosition: {
      type: 'enum',
      label: 'Position',
      enumOptions: [
        { label: 'Left', value: 'left' },
        { label: 'Top', value: 'top' },
      ],
    },
    labelAlignment: {
      type: 'enum',
      label: 'Alignment',
      enumOptions: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    labelWidth: {
      type: 'string',
      label: 'Width',
    },
    tooltip: {
      type: 'string',
      label: 'Tooltip',
    },
    helper: {
      type: 'string',
      label: 'Helper Text',
    },
    spellCheck: {
      type: 'boolean',
      label: 'Enable Spell Check',
    },
    autofill: {
      type: 'boolean',
      label: 'Enable Browser Autofill',
    },
    change: {
      type: 'callback',
      label: 'Change Event Binding',
    },
    enter: {
      type: 'callback',
      label: 'Enter Event Binding',
    },
  },
} as const;
