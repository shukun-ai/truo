import React, { FunctionComponent, useCallback } from 'react';

import { flowUICommand } from '../../services/flow-ui';

import { FlowEditingModal } from './flow-editing-modal';

import { FlowInsertModal } from './flow-insert-modal';

export interface FlowActionProps {}

export const FlowAction: FunctionComponent<FlowActionProps> = () => {
  const handleClick = useCallback(() => {
    flowUICommand.openInsertModal();
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          height: 64,
          backgroundColor: '#fff',
          borderRadius: 32,
          position: 'absolute',
          bottom: 10,
          left: '50%',
          color: '#000',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        Insert
      </div>

      <FlowInsertModal />
      <FlowEditingModal />
    </div>
  );
};
