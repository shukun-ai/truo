import { textDefinition } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const TextWidget = createWidget(textDefinition, (props) => {
  return (
    <p
      style={{
        color: props.color,
        fontSize: props.fontSize,
        fontStyle: props.fontStyle,
        textAlign: props.textAlign as any,
      }}
    >
      ${props.value}
    </p>
  );
});
