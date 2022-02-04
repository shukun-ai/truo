import { CustomMode, EMIT_FINISH } from '@shukun/api';
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
      `${CustomMode.TableAction} 类型下不提供 ${EMIT_FINISH} 事件。`,
    );
  }, []);

  const handleSearch = useCallback(
    (search: SearchModel) => {
      searchService.updateSearch(search, view.search ?? null);
    },
    [view.search],
  );

  return (
    <CustomViewExperiment
      customMode={CustomMode.TableAction}
      url={customAction.value ?? ''}
      search={search}
      sources={sources}
      onFinish={handleFinish}
      onRefresh={handleRefresh}
      onSearch={handleSearch}
    />
  );
};
