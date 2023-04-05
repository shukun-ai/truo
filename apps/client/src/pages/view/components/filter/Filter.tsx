import { LegacyFunctionComponent } from '@shukun/component';
import { MetadataSchema, ViewSearch, ViewTableField } from '@shukun/schema';
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
  viewTableFields: ViewTableField[];
  viewSearch: ViewSearch | undefined;
}

export const Filter: LegacyFunctionComponent<FilterProps> = ({
  metadata,
  viewTableFields,
  viewSearch,
}) => {
  const filters = useObservableState(
    searchQuery.filter$,
    defaultSearchValue.filter,
  );

  const [form] = Form.useForm<SearchFilter>();

  const visibleViewTableFields = useMemo(() => {
    return viewTableFields.filter((item) => !item.filterHidden);
  }, [viewTableFields]);

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

  if (visibleViewTableFields.length === 0) {
    return null;
  }

  return (
    <FilterContext.Provider value={{ form }}>
      <Form<SearchFilter> form={form} layout="inline" onFinish={handleFinish}>
        {visibleViewTableFields.map((viewTableField) => (
          <div key={viewTableField.name} style={{ marginBottom: 8 }}>
            <FilterFormItem
              metadata={metadata}
              viewTableField={viewTableField}
            />
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
