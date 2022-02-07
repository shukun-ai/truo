import {
  MetadataSchema,
  ViewSchema,
  ViewV2CustomAction,
  ViewV2CustomActionType,
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

  const customActions = useMemo<ViewV2CustomAction[]>(() => {
    if (!view?.configurations?.v2CustomActions) {
      return [];
    }
    return view.configurations.v2CustomActions.filter(
      (custom) => custom.type === ViewV2CustomActionType.Column,
    );
  }, [view?.configurations?.v2CustomActions]);

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
