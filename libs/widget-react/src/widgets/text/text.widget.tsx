import { textDefinition, TextDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const TextWidget = createWidget<TextDefinitionProps>(
  textDefinition,
  (props) => {
    return (
      <p
        style={{
          color: props.color,
          fontSize: props.fontSize,
          fontStyle: props.fontStyle,
          textAlign: props.textAlign as any,
        }}
      >
        {props.value}
      </p>
    );
  },
);
