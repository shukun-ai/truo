import { buttonDefinition, ButtonDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const ButtonWidget = createWidget<ButtonDefinitionProps>(
  buttonDefinition,
  (props) => {
    return <button>{props.text}</button>;
  },
);
