import { LegacyFunctionComponent } from '@shukun/component';
import { PostMessageCustomModeType } from '@shukun/postmate';
import {
  MetadataSchema,
  ViewSchema,
  ViewLinkType,
  ViewRibbon,
} from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, ReactNode, useCallback } from 'react';

import { Ribbon } from '../../../../components/ribbon';
import { tableActiveEntities$ } from '../../../../services/table';
import { RibbonCustomButton } from '../ribbon/RibbonCustomButton';
import { RibbonCustomModalButton } from '../ribbon/RibbonCustomModalButton';

import { TableCreateButton } from './ribbons/TableCreateButton';
import { TableCsvButton } from './ribbons/TableCsvButton';
import { TableExcelButton } from './ribbons/TableExcelButton';
import { TableRefreshButton } from './ribbons/TableRefreshButton';
import { TableRemoveButton } from './ribbons/TableRemoveButton';

export interface TableRibbonProps {
  metadata: MetadataSchema;
  viewRibbons: ViewRibbon[];
  view: ViewSchema;
}

export const TableRibbon: LegacyFunctionComponent<TableRibbonProps> = ({
  metadata,
  viewRibbons,
  view,
}) => {
  const tableActiveEntities = useObservableState(tableActiveEntities$, []);

  const customRibbons = useCallback<(viewRibbon: ViewRibbon) => ReactNode>(
    (viewRibbon) => {
      switch (viewRibbon.type) {
        case ViewLinkType.CreateOne:
          return <TableCreateButton key="TableCreateButton" view={view} />;
        case ViewLinkType.DeleteOne:
          return (
            <TableRemoveButton
              key="TableRemoveButton"
              view={view}
              metadata={metadata}
              viewRibbon={viewRibbon}
              sources={tableActiveEntities}
            />
          );
        case ViewLinkType.Excel:
          return <TableExcelButton key="TableExcelButton" view={view} />;
        case ViewLinkType.Csv:
          return <TableCsvButton key="TableCsvButton" view={view} />;
        case ViewLinkType.CustomModal:
          return (
            <RibbonCustomModalButton
              key={viewRibbon.name}
              customMode={PostMessageCustomModeType.TableModal}
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
