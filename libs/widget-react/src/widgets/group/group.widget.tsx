import { groupDefinition, GroupDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const GroupWidget = createWidget<GroupDefinitionProps>(
  groupDefinition,
  (props) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: props.direction === 'horizontal' ? 'row' : 'column',
          padding: props.padding,
          margin: props.margin,
        }}
      >
        {props.children}
      </div>
    );
  },
);
