import { PostMessageCustomModeType, PostMessageEvent } from '@shukun/api';
import { message, Modal } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useState } from 'react';

import {
  customModalQuery,
  customModalService,
} from '../../../../services/custom-modal';
import { detailService } from '../../../../services/detail';
import { SearchModel, searchService } from '../../../../services/search';
import { tableService } from '../../../../services/table';
import { designSystem } from '../../../../utils/design-system';

import { CustomViewExperiment } from './CustomViewExperiment';

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

  const [loading, setLoading] = useState(false);

  const handleCancel = useCallback(() => {
    if (loading) {
      message.warning('请勿关闭对话框，请等待加载完成。');
    } else {
      customModalService.closeModal();
    }
  }, [loading]);

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

  const handleLoading = useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  return (
    <Modal
      forceRender
      destroyOnClose
      title={label}
      visible={visible}
      onCancel={handleCancel}
      maskClosable={!loading}
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
          defaultHeight="500px"
          onFinish={handleCancel}
          onRefresh={handleRefresh}
          onSearch={handleSearch}
          onLoading={handleLoading}
        />
      )}
    </Modal>
  );
};
