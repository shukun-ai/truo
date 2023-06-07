import { SearchOutlined } from '@ant-design/icons';
import { LegacyFunctionComponent } from '@shukun/component';
import { ViewSchema, ViewType } from '@shukun/schema';
import { AutoComplete, Input } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, {
  FunctionComponent,
  useMemo,
  useCallback,
  useState,
} from 'react';

import { views$ } from '../../services/view';

export interface SearchProps {}

export const Search: LegacyFunctionComponent<SearchProps> = () => {
  const [keyword, setKeyword] = useState<string | undefined>();

  const views = useObservableState(views$, []);

  const options = useMemo(() => {
    let newViews: ViewSchema[] = views.filter(
      (view) => view.isVisible && view.type !== ViewType.Menu,
    );

    if (!keyword) {
      newViews = newViews.slice(0, 5);
    } else {
      newViews = newViews.filter((view) => view.label.includes(keyword));
    }

    const options = newViews.map((view) => renderItem(view));

    return [
      {
        label: renderTitle('视图'),
        options,
      },
    ];
  }, [views, keyword]);

  const handleSearch = useCallback<(value: string) => void>((value) => {
    setKeyword(value);
  }, []);

  return (
    <AutoComplete
      className="global-header-search"
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      style={{ width: 370, marginLeft: 16 }}
      options={options}
      onSearch={handleSearch}
    >
      <Input
        className="global-header-search__input"
        size="large"
        placeholder="搜索..."
        prefix={<SearchOutlined />}
      />
    </AutoComplete>
  );
};

const renderTitle = (title: string) => <span>{title}</span>;

const renderItem = (view: ViewSchema) => ({
  value: view.label,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {view.label}
    </div>
  ),
});
