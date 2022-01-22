import clsx from 'clsx';
import React, { FunctionComponent, ReactNode } from 'react';

export interface TableHeaderCellProps {
  name: string;
  // additionalProps?: undefined
  align: 'left' | 'right';
  children: string | ReactNode;
  className: string;
  colEnd: number;
  colSpan: number;
  colStart: number;
  column: { title: string; dataIndex: string; key: string };
  // component: "th"
  ellipsis: boolean;
  firstFixLeft: boolean;
  firstFixRight: boolean;
  // fixLeft: undefined
  // fixRight: undefined
  // isSticky: undefined
  lastFixLeft: boolean;
  lastFixRight: boolean;
  prefixCls: string;
  rowSpan: number;
  // rowType: "header"
}

export const TableHeaderCell: FunctionComponent<TableHeaderCellProps> = ({
  name,
  children,
  className,
}) => {
  return (
    <th className={clsx('ant-table-cell', className)}>
      <div>{children}</div>
      {name.startsWith('RC_') || (
        <div>
          <input style={{ width: '100%' }} />
        </div>
      )}
    </th>
  );
};
