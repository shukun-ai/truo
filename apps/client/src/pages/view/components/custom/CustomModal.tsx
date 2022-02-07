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
import { PostMessageCustomModeType, PostMessageEvent } from '@shukun/api';
import { detailService } from '../../../../services/detail';

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

  const handleRefresh = useCallback(() => {
    if (customMode === PostMessageCustomModeType.TableModal) {
      if (view && metadata) {
        tableService.findMany(view, metadata);
        return;
      }
    } else if (customMode === PostMessageCustomModeType.DetailModal) {
      if (sources.length === 1 && metadata) {
        detailService.findOne(sources[0]._id, metadata);
        return;
      }
    }
    console.info(
      `${customMode} 类型下不提供 ${PostMessageEvent.EMIT_FINISH} 事件。`,
    );
  }, [view, metadata, customMode, sources]);

  const handleSearch = useCallback(
    (search: SearchModel) => {
      if (customMode === PostMessageCustomModeType.TableModal) {
        searchService.updateSearch(search, view?.search ?? null);
      }
      console.info(
        `${customMode} 类型下不提供 ${PostMessageEvent.EMIT_SEARCH} 事件。`,
      );
    },
    [view?.search, customMode],
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
          onRefresh={handleRefresh}
          onSearch={handleSearch}
        />
      )}
    </Modal>
  );
};
