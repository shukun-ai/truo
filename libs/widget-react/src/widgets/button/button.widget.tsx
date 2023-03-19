import { buttonDefinition, ButtonDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const ButtonWidget = createWidget<ButtonDefinitionProps>(
  buttonDefinition,
  (props) => {
    return <button onClick={() => props?.click(null)}>{props.text}</button>;
  },
);
