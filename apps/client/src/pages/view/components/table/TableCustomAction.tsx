import { PostMessageCustomModeType, PostMessageEvent } from '@shukun/api';
import { MetadataSchema, ViewSchema, ViewV2CustomAction } from '@shukun/schema';
import React, { FunctionComponent, useCallback } from 'react';

import { UnknownSourceModel } from '../../../../models/source';
import { SearchModel, searchService } from '../../../../services/search';
import { tableService } from '../../../../services/table';
import { CustomViewExperiment } from '../custom/CustomViewExperiment';

export interface TableCustomActionProps {
  customAction: ViewV2CustomAction;
  view: ViewSchema;
  metadata: MetadataSchema;
  search: SearchModel | null;
  sources: UnknownSourceModel[];
}

export const TableCustomAction: FunctionComponent<TableCustomActionProps> = ({
  customAction,
  view,
  metadata,
  search,
  sources,
}) => {
  const handleRefresh = useCallback(() => {
    if (view && metadata) {
      tableService.findMany(view, metadata);
      return;
    }
  }, [view, metadata]);

  const handleFinish = useCallback(() => {
    console.info(
      `${PostMessageCustomModeType.TableAction} 类型下不提供 ${PostMessageEvent.EMIT_FINISH} 事件。`,
    );
  }, []);

  const handleSearch = useCallback(
    (search: SearchModel) => {
      searchService.updateSearch(search, view.search ?? null);
    },
    [view.search],
  );

  const handleLoading = useCallback(() => {
    console.info(
      `${PostMessageCustomModeType.DetailTab} 类型下不提供 ${PostMessageEvent.EMIT_LOADING} 事件。`,
    );
  }, []);

  return (
    <CustomViewExperiment
      customMode={PostMessageCustomModeType.TableAction}
      url={customAction.value ?? ''}
      search={search}
      sources={sources}
      onFinish={handleFinish}
      onRefresh={handleRefresh}
      onSearch={handleSearch}
      onLoading={handleLoading}
      defaultHeight="60px"
    />
  );
};
