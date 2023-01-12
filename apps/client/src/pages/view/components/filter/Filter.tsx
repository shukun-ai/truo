import { MetadataSchema, ViewSearch, ViewColumn } from '@shukun/schema';
import { useDebounceEffect } from 'ahooks';
import { Button, Form, Space } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import {
  defaultSearchValue,
  searchService,
  searchQuery,
  SearchFilter,
} from '../../../../services/search';

import { FilterContext } from './FilterContext';
import { FilterFormItem } from './FilterFormItem';

export interface FilterProps {
  metadata: MetadataSchema;
  viewColumns: ViewColumn[];
  viewSearch: ViewSearch | undefined;
}

export const Filter: FunctionComponent<FilterProps> = ({
  metadata,
  viewColumns,
  viewSearch,
}) => {
  const filters = useObservableState(
    searchQuery.filter$,
    defaultSearchValue.filter,
  );

  const [form] = Form.useForm<SearchFilter>();

  const visibleViewColumns = useMemo(() => {
    return viewColumns.filter((item) => !item.filterHidden);
  }, [viewColumns]);

  useDebounceEffect(
    () => {
      if (filters) {
        form.resetFields();
        form.setFieldsValue(filters);
      } else {
        form.resetFields();
      }
    },
    [form, filters],
    { wait: 100 },
  );

  const handleFinish = useCallback(
    (values: SearchFilter) => {
      searchService.updateSearchFilter(values, viewSearch ?? null);
    },
    [viewSearch],
  );

  const handleReset = useCallback(() => {
    searchService.resetSearchFilter(viewSearch ?? null);
  }, [viewSearch]);

  if (visibleViewColumns.length === 0) {
    return null;
  }

  return (
    <FilterContext.Provider value={{ form }}>
      <Form<SearchFilter> form={form} layout="inline" onFinish={handleFinish}>
        {visibleViewColumns.map((viewColumn) => (
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
