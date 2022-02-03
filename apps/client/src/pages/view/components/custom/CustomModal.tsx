import React, { FunctionComponent, useCallback } from 'react';
import { Modal } from 'antd';
import { designSystem } from '../../../../utils/design-system';
import { useObservableState } from 'observable-hooks';
import {
  customModalQuery,
  customModalService,
} from '../../../../services/custom-modal';
import { CustomViewExperiment } from './CustomViewExperiment';

export interface CustomModalProps {}

export const CustomModal: FunctionComponent<CustomModalProps> = () => {
  const label = useObservableState(customModalQuery.label$, null);

  const visible = useObservableState(customModalQuery.visible$, false);

  const url = useObservableState(customModalQuery.url$, null);

  const sources = useObservableState(customModalQuery.sources$, []);

  const handleCancel = useCallback(() => {
    customModalService.closeModal();
  }, []);

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
        />
      )}
    </Modal>
  );
};
