import { FlowEvent, FlowEventStore } from '@shukun/schema';
import React, { FunctionComponent, useCallback } from 'react';

import { flowQuery } from '../../../services/flow';

export interface EventNodeInsertProps {
  eventName: string;
  event: FlowEvent;
}

export const EventNodeInsert: FunctionComponent<EventNodeInsertProps> = ({
  eventName,
  event,
}) => {
  const handleClick = useCallback(() => {
    const event: FlowEventStore = {
      type: 'Store',
      key: 'nihao',
      value: 'nihao',
      next: '',
    };

    const previousEventName = eventName;

    const flow = flowQuery.getCloneFlow('retrieve_receive_tasks');
  }, [eventName]);

  if (event.type === 'Success' || event.type === 'Fail') {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 28,
        height: 28,
        borderRadius: 2,
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        cursor: 'pointer',
        right: -14,
        top: '50%',
        transform: 'translate(0, -50%)',
      }}
      onClick={handleClick}
    >
      +
    </div>
  );
};
