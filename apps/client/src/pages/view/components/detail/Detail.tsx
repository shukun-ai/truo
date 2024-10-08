import { LegacyFunctionComponent } from '@shukun/component';
import { MetadataSchema, UnknownSourceModel, ViewSchema } from '@shukun/schema';
import { Form, Spin } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router';

import {
  DetailMode,
  detailService,
  loading$,
  mode$,
  source$,
} from '../../../../services/detail';
import { IDString } from '../../../../utils/model-helpers';
import { FormContext } from '../form/FormContext';

import { DetailContent } from './DetailContent';
import { DetailRibbon } from './DetailRibbon';

export interface DetailProps {
  view: ViewSchema;
  metadata: MetadataSchema;
}

export const Detail: LegacyFunctionComponent<DetailProps> = ({
  view,
  metadata,
}) => {
  const source = useObservableState(source$);

  const loading = useObservableState(loading$);

  const { sourceId } = useParams<{ sourceId?: IDString }>();

  useEffect(() => {
    if (sourceId) {
      detailService.findOne(sourceId, metadata);
    }
  }, [sourceId, metadata]);

  const [form] = Form.useForm<UnknownSourceModel>();

  const mode = useObservableState(mode$, DetailMode.Show);

  useEffect(() => {
    detailService.setShowMode();
  }, []);

  return (
    <Spin spinning={loading}>
      <FormContext.Provider value={{ form, row: source ?? null, mode: mode }}>
        <DetailRibbon
          viewRibbons={view.configurations?.detailRibbons || []}
          view={view}
          metadata={metadata}
        />
        <DetailContent
          form={form}
          metadata={metadata}
          view={view}
          source={source ?? null}
        />
      </FormContext.Provider>
    </Spin>
  );
};
