import { Button } from 'antd';
import React, { FunctionComponent, useCallback } from 'react';

import { flowUICommand } from '../../services/flow-ui';

import { EventAction } from './action/event-action';
import { PADDING } from './flow-constant';
import { FlowInsertModal } from './insert/flow-insert-modal';
import { EventCodeModal } from './modal/event-code-modal';

export interface FlowActionProps {}

export const FlowAction: FunctionComponent<FlowActionProps> = () => {
  const handleClick = useCallback(() => {
    flowUICommand.openInsertModal();
  }, []);

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          minWidth: 360,
          paddingLeft: PADDING,
          paddingRight: PADDING,
          height: 44,
          background: 'rgba(0,0,0,0.8)',
          left: '50%',
          bottom: 0,
          transform: 'translate(-50%, 0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ marginRight: 6 }}>Start Event</div>
        <div>
          <EventAction />
        </div>
        <div style={{ paddingLeft: PADDING, paddingRight: PADDING }}>/</div>
        <div>
          <Button type="primary" onClick={handleClick}>
            Insert a event
          </Button>
        </div>
      </div>

      <FlowInsertModal />
      <EventCodeModal />
    </div>
  );
};
