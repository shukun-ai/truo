import { inputDefinition } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const InputWidget = createWidget(inputDefinition, (props) => {
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
});
