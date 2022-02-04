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
import { SearchModel, searchService } from '../../../../services/search';

export interface CustomModalProps {}

export const CustomModal: FunctionComponent<CustomModalProps> = () => {
  const customMode = useObservableState(customModalQuery.customMode$, null);

  const label = useObservableState(customModalQuery.label$, null);

  const visible = useObservableState(customModalQuery.visible$, false);

  const url = useObservableState(customModalQuery.url$, null);

  const search = useObservableState(customModalQuery.search$, null);

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

  const handleTableSearch = useCallback(
    (filter: SearchModel) => {
      searchService.updateSearch(filter, view?.search ?? null);
    },
    [view?.search],
  );

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
          customMode={customMode}
          url={url}
          search={search}
          sources={sources}
          onFinish={handleCancel}
          onRefresh={handleTableRefresh}
          onSearch={handleTableSearch}
        />
      )}
    </Modal>
  );
};
