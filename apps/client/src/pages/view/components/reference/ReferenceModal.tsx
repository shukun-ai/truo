import { Modal } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useEffect } from 'react';

import {
  metadataService,
  useMetadataByAtom,
} from '../../../../services/metadata';
import {
  electronReferenceTo$,
  modalLabel$,
  modalVisible$,
  onFinish$,
  referenceService,
  selectedRow$,
  view$,
} from '../../../../services/reference';
import { initialState } from '../../../../services/reference/store';
import { designSystem } from '../../../../utils/design-system';

import { ReferenceTable } from './ReferenceTable';

export interface ReferenceModalProps {}

export const ReferenceModal: FunctionComponent<ReferenceModalProps> = () => {
  const modalVisible = useObservableState(
    modalVisible$,
    initialState.modalVisible,
  );

  const modalLabel = useObservableState(modalLabel$, initialState.modalLabel);

  const electronReferenceTo = useObservableState(
    electronReferenceTo$,
    initialState.electronReferenceTo,
  );

  const onFinish = useObservableState(onFinish$, null);

  const view = useObservableState(view$, initialState.view);

  const [metadata] = useMetadataByAtom(electronReferenceTo ?? undefined);

  useEffect(() => {
    if (electronReferenceTo) {
      metadataService.fetchOneIfNull(electronReferenceTo);
    }
  }, [electronReferenceTo]);

  const selectedRow = useObservableState(
    selectedRow$,
    initialState.selectedRow,
  );

  const handleCancel = useCallback(() => {
    referenceService.reset();
  }, []);

  const handleFinish = useCallback(() => {
    const success = onFinish && onFinish.method && onFinish.method(selectedRow);

    if (success) {
      handleCancel();
    }
  }, [onFinish, handleCancel, selectedRow]);

  return (
    <Modal
      forceRender
      destroyOnClose
      title={modalLabel}
      open={modalVisible}
      onOk={handleFinish}
      okButtonProps={{
        disabled: selectedRow.length === 0,
      }}
      onCancel={handleCancel}
      zIndex={designSystem.modalZIndex}
      width={940}
    >
      {view && metadata && <ReferenceTable view={view} metadata={metadata} />}
    </Modal>
  );
};
