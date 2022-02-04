import {
  MetadataSchema,
  ViewSchema,
  ViewV2LinkType,
  ViewV2Ribbon,
} from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, ReactNode, useCallback } from 'react';
import { CustomMode } from '@shukun/api';

import { Ribbon } from '../../../../components/ribbon';
import { tableActiveEntities$ } from '../../../../services/table';
import { RibbonCustomButton } from '../ribbon/RibbonCustomButton';
import { RibbonCustomModalButton } from '../ribbon/RibbonCustomModalButton';

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
  const tableActiveEntities = useObservableState(tableActiveEntities$, []);

  const customRibbons = useCallback<(viewRibbon: ViewV2Ribbon) => ReactNode>(
    (viewRibbon) => {
      switch (viewRibbon.type) {
        case ViewV2LinkType.CreateOne:
          return <TableCreateButton key="TableCreateButton" view={view} />;
        case ViewV2LinkType.Excel:
          return <TableExcelButton key="TableExcelButton" view={view} />;
        case ViewV2LinkType.Csv:
          return <TableCsvButton key="TableCsvButton" view={view} />;
        case ViewV2LinkType.CustomModal:
          return (
            <RibbonCustomModalButton
              key={viewRibbon.name}
              customMode={CustomMode.TableModal}
              view={view}
              metadata={metadata}
              viewRibbon={viewRibbon}
              sources={tableActiveEntities}
            />
          );
        default:
          return (
            <RibbonCustomButton
              key={viewRibbon.name}
              viewRibbon={viewRibbon}
              source={null}
              sources={tableActiveEntities}
            />
          );
      }
    },
    [view, metadata, tableActiveEntities],
  );

  return (
    <Ribbon>
      <TableRefreshButton view={view} metadata={metadata} />
      {viewRibbons.map((viewRibbon) => customRibbons(viewRibbon))}
    </Ribbon>
  );
};
