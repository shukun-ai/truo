import {
  MetadataSchema,
  ViewSchema,
  ViewV2LinkType,
  ViewV2Ribbon,
} from '@shukun/schema';
import React, { FunctionComponent, ReactNode, useCallback } from 'react';

import { Ribbon } from '../../../../components/ribbon';
import { RibbonCustomButton } from '../ribbon/RibbonCustomButton';

import { TableCreateButton } from './ribbons/TableCreateButton';
import { TableCsvButton } from './ribbons/TableCsvButton';
import { TableExcelButton } from './ribbons/TableExcelButton';
import { TableRefreshButton } from './ribbons/TableRefreshButton';

export interface TableRibbonProps {
  metadata: MetadataSchema;
  viewRibbons: ViewV2Ribbon[];
  view: ViewSchema;
}

export const TableRibbon: FunctionComponent<TableRibbonProps> = ({
  metadata,
  viewRibbons,
  view,
}) => {
  const customRibbons = useCallback<(viewRibbon: ViewV2Ribbon) => ReactNode>(
    (viewRibbon) => {
      switch (viewRibbon.type) {
        case ViewV2LinkType.CreateOne:
          return <TableCreateButton key="TableCreateButton" view={view} />;
        case ViewV2LinkType.Excel:
          return <TableExcelButton key="TableExcelButton" view={view} />;
        case ViewV2LinkType.Csv:
          return <TableCsvButton key="TableCsvButton" view={view} />;
        default:
          return (
            <RibbonCustomButton
              key="RibbonCustomButton"
              viewRibbon={viewRibbon}
              source={null}
              sources={[]}
            />
          );
      }
    },
    [view],
  );

  return (
    <Ribbon>
      <TableRefreshButton view={view} metadata={metadata} />
      {viewRibbons.map((viewRibbon) => customRibbons(viewRibbon))}
    </Ribbon>
  );
};
