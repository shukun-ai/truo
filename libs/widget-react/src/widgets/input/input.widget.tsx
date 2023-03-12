import { inputDefinition, InputDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const InputWidget = createWidget<InputDefinitionProps>(
  inputDefinition,
  (props) => {
    return (
      <div>
        <div>
          <div>{props.label}</div>
          <div>{props.labelCaption}</div>
        </div>
        <div>
          <input
            value={props.value}
            onChange={(event) => props.change(event.target.value)}
          />
        </div>
      </div>
    );
  },
);
