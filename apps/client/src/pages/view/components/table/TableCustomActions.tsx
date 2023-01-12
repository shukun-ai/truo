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

export const TableCustomActions: FunctionComponent<TableCustomActionsProps> = ({
  view,
  metadata,
}) => {
  const search = useObservableState(searchQuery.activeSearch$);

  const tableActiveEntities = useObservableState(tableActiveEntities$, []);

  const customActions = useMemo<ViewCustomAction[]>(() => {
    if (!view?.configurations?.customActions) {
      return [];
    }
    return view.configurations.customActions.filter(
      (custom) => custom.type === ViewCustomActionType.Column,
    );
  }, [view?.configurations?.customActions]);

  return (
    <>
      {customActions.map((customAction) => (
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
