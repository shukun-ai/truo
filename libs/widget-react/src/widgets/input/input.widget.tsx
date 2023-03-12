import { inputDefinition, InputDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const InputWidget = createWidget<InputDefinitionProps>(
  inputDefinition,
  (props) => {
    return (
      <div>
        <div>
          <div>{props}</div>
          <div>Caption</div>
        </div>
        <div>
          <input value={props.value} />
        </div>
      </div>
    );
  },
);
