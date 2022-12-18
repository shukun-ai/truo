import { FlowEvent } from '@shukun/schema';
import React, { FunctionComponent } from 'react';

export interface EventNodeInsertProps {
  event: FlowEvent;
}

export const EventNodeInsert: FunctionComponent<EventNodeInsertProps> = ({
  event,
}) => {
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
      onClick={() => console.log('hi')}
    >
      +
    </div>
  );
};
