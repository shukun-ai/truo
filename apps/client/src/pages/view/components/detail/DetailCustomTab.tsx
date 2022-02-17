import { PostMessageCustomModeType, PostMessageEvent } from '@shukun/api';
import { MetadataSchema, ViewSchema, ViewV2FieldGroup } from '@shukun/schema';
import React, { FunctionComponent, useCallback, useContext } from 'react';

import { detailService } from '../../../../services/detail';
import { CustomViewExperiment } from '../custom/CustomViewExperiment';
import { FormContext } from '../form/FormContext';

export interface CustomTabProps {
  metadata: MetadataSchema;
  view: ViewSchema;
  viewFieldGroup: ViewV2FieldGroup;
}

export const CustomTab: FunctionComponent<CustomTabProps> = ({
  metadata,
  viewFieldGroup,
}) => {
  const { row } = useContext(FormContext);

  const handleRefresh = useCallback(() => {
    if (row) {
      detailService.findOne(row._id, metadata);
    }
  }, [row, metadata]);

  const handleFinish = useCallback(() => {
    console.info(
      `${PostMessageCustomModeType.DetailTab} 类型下不提供 ${PostMessageEvent.EMIT_FINISH} 事件。`,
    );
  }, []);

  const handleSearch = useCallback(() => {
    console.info(
      `${PostMessageCustomModeType.DetailTab} 类型下不提供 ${PostMessageEvent.EMIT_SEARCH} 事件。`,
    );
  }, []);

  const handleLoading = useCallback(() => {
    console.info(
      `${PostMessageCustomModeType.DetailTab} 类型下不提供 ${PostMessageEvent.EMIT_LOADING} 事件。`,
    );
  }, []);

  return (
    <CustomViewExperiment
      customMode={PostMessageCustomModeType.DetailTab}
      url={viewFieldGroup.value ?? ''}
      search={null}
      sources={row ? [row] : row}
      onFinish={handleFinish}
      onRefresh={handleRefresh}
      onSearch={handleSearch}
      onLoading={handleLoading}
    />
  );
};
