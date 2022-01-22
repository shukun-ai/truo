import React, { FunctionComponent } from 'react';

import { TableHeaderCell } from './TableHeaderCell';

export interface TableHeaderRowProps {}

export const TableHeaderRow: FunctionComponent<TableHeaderRowProps> = ({
  children,
}) => {
  return (
    <tr>
      {(children as any).map((child: any) => (
        <TableHeaderCell key={child.key} name={child.key} {...child.props} />
      ))}
    </tr>
  );
};
