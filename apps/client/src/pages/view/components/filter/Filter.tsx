import { MetadataSchema, ViewQuery, ViewV2Column } from '@shukun/schema';
import { useDebounceEffect } from 'ahooks';
import { Button, Form, Space } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import {
  defaultFilterValue,
  filter$,
  filterService,
} from '../../../../services/filter';
import { FilterRawValues } from '../../../../services/table/model';

import { convertQueryStringToRaw, convertRawToQueryString } from './converter';
import { FilterContext } from './FilterContext';
import { FilterFormItem } from './FilterFormItem';

export interface FilterProps {
  metadata: MetadataSchema;
  viewColumns: ViewV2Column[];
  viewQuery: ViewQuery | undefined;
}

export const Filter: FunctionComponent<FilterProps> = ({
  metadata,
  viewColumns,
  viewQuery,
}) => {
  const filters = useObservableState(filter$, defaultFilterValue.filter);

  const [form] = Form.useForm<FilterRawValues>();

  const formValues = useMemo(() => {
    if (!filters) {
      return undefined;
    }
    const formValues = convertQueryStringToRaw(filters, metadata, viewColumns);
    return formValues;
  }, [filters, metadata, viewColumns]);

  useDebounceEffect(
    () => {
      if (formValues) {
        form.setFieldsValue(formValues);
      } else {
        form.resetFields();
      }
    },
    [form, formValues],
    { wait: 100 },
  );

  const handleFinish = useCallback(
    (values: FilterRawValues) => {
      const filters = convertRawToQueryString(values, metadata, viewColumns);
      filterService.updateFilter(filters, viewQuery ?? null);
    },
    [metadata, viewColumns, viewQuery],
  );

  const handleReset = useCallback(() => {
    filterService.clearFilter(viewQuery ?? null);
  }, [viewQuery]);

  return (
    <FilterContext.Provider value={{ form }}>
      <Form<FilterRawValues>
        form={form}
        layout="inline"
        onFinish={handleFinish}
      >
        {viewColumns.map((viewColumn) => (
          <div key={viewColumn.name} style={{ marginBottom: 8 }}>
            <FilterFormItem metadata={metadata} viewColumn={viewColumn} />
          </div>
        ))}
        <Space style={{ marginBottom: 8 }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button onClick={handleReset}>清空</Button>
        </Space>
      </Form>
    </FilterContext.Provider>
  );
};
