import { FlowEvent } from '@shukun/schema';
import { Button } from 'antd';
import React, { FunctionComponent, useCallback } from 'react';

import { flowCommand, flowQuery } from '../../../services/flow';

export interface EventNodeActionProps {
  eventName: string;
  event: FlowEvent;
}

export const EventNodeAction: FunctionComponent<EventNodeActionProps> = ({
  eventName,
}) => {
  const handleClick = useCallback(() => {
    const flow = flowQuery.getCloneFlow('retrieve_receive_tasks');
    flowCommand.remove(flow, eventName);
  }, [eventName]);

  return (
    <div>
      <Button size="small" onClick={handleClick}>
        Remove
      </Button>
    </div>
  );
};
