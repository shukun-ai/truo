import { LegacyFunctionComponent } from '@shukun/component';
import {
  MetadataSchema,
  ViewSchema,
  ViewCustomAction,
  ViewCustomActionType,
} from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';

import { searchQuery } from '../../../../services/search';
import { tableActiveEntities$ } from '../../../../services/table';

import { TableCustomAction } from './TableCustomAction';

export interface TableCustomActionsProps {
  view: ViewSchema;
  metadata: MetadataSchema;
}

export const TableCustomActions: LegacyFunctionComponent<
  TableCustomActionsProps
> = ({ view, metadata }) => {
  const search = useObservableState(searchQuery.activeSearch$);

  const tableActiveEntities = useObservableState(tableActiveEntities$, []);

  const tableCustomActions = useMemo<ViewCustomAction[]>(() => {
    if (!view?.configurations?.tableCustomActions) {
      return [];
    }
    return view.configurations.tableCustomActions.filter(
      (custom) => custom.type === ViewCustomActionType.Column,
    );
  }, [view?.configurations?.tableCustomActions]);

  return (
    <>
      {tableCustomActions.map((customAction) => (
        <TableCustomAction
          key={customAction.name}
          search={search ?? null}
          sources={tableActiveEntities}
          customAction={customAction}
          view={view}
          metadata={metadata}
        />
      ))}
    </>
  );
};
