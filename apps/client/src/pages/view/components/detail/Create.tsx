import { LegacyFunctionComponent } from '@shukun/component';
import { MetadataSchema, UnknownSourceModel, ViewSchema } from '@shukun/schema';
import { Form, Spin } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useEffect } from 'react';

import {
  DetailMode,
  detailService,
  loading$,
  mode$,
} from '../../../../services/detail';
import { FormContext } from '../form/FormContext';

import { CreateRibbon } from './CreateRibbon';
import { DetailContent } from './DetailContent';

export interface CreateProps {
  view: ViewSchema;
  metadata: MetadataSchema;
}

export const Create: LegacyFunctionComponent<CreateProps> = ({
  view,
  metadata,
}) => {
  const [form] = Form.useForm<UnknownSourceModel>();

  const mode = useObservableState(mode$, DetailMode.Show);

  const loading = useObservableState(loading$);

  useEffect(() => {
    detailService.setCreateMode();
  }, []);

  return (
    <Spin spinning={loading}>
      <FormContext.Provider value={{ form, row: null, mode: mode }}>
        <CreateRibbon
          viewRibbons={view.configurations?.detailRibbons || []}
          metadata={metadata}
        />
        <DetailContent
          form={form}
          metadata={metadata}
          view={view}
          source={null}
        />
      </FormContext.Provider>
    </Spin>
  );
};
