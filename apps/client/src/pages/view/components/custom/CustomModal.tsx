import React, { FunctionComponent, useCallback } from 'react';
import { Modal } from 'antd';
import { designSystem } from '../../../../utils/design-system';
import { useObservableState } from 'observable-hooks';
import {
  customModalQuery,
  customModalService,
} from '../../../../services/custom-modal';
import { CustomViewExperiment } from './CustomViewExperiment';
import { tableService } from '../../../../services/table';

export interface CustomModalProps {}

export const CustomModal: FunctionComponent<CustomModalProps> = () => {
  const label = useObservableState(customModalQuery.label$, null);

  const visible = useObservableState(customModalQuery.visible$, false);

  const url = useObservableState(customModalQuery.url$, null);

  const sources = useObservableState(customModalQuery.sources$, []);

  const view = useObservableState(customModalQuery.view$, null);

  const metadata = useObservableState(customModalQuery.metadata$, null);

  const handleCancel = useCallback(() => {
    customModalService.closeModal();
  }, []);

  const handleTableRefresh = useCallback(() => {
    if (view && metadata) {
      tableService.findMany(view, metadata);
    }
  }, [view, metadata]);

  return (
    <Modal
      forceRender
      destroyOnClose
      title={label}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      zIndex={designSystem.modalZIndex}
      width={940}
    >
      {visible && (
        <CustomViewExperiment
          url={url}
          sources={sources}
          onFinish={handleCancel}
          onRefresh={handleTableRefresh}
          onFilter={null}
        />
      )}
    </Modal>
  );
};
