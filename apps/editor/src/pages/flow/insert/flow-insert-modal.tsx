import { Modal } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback } from 'react';

import { flowUICommand, flowUIQuery } from '../../../services/flow-ui';

import { FlowInsertForm } from './flow-insert-form';

export interface FlowInsertModalProps {}

export const FlowInsertModal: FunctionComponent<FlowInsertModalProps> = () => {
  const insertModalVisible = useObservableState(
    flowUIQuery.insertModalVisible$,
    false,
  );

  const handleCancel = useCallback(() => {
    flowUICommand.closeInsertModal();
  }, []);

  return (
    <Modal
      forceRender
      destroyOnClose
      title="Insert a new event"
      open={insertModalVisible}
      onCancel={handleCancel}
      maskClosable
      footer={null}
      width={600}
    >
      <FlowInsertForm />
    </Modal>
  );
};
