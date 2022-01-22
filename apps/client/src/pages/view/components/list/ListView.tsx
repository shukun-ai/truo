import { ViewSchema } from '@shukun/schema';
import { Skeleton } from 'antd';
import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import { PageHeader } from '../../../../components/page';
import { useMetadataByAtom } from '../../../../services/metadata';
import { RoutePath } from '../../../../utils/history-provider';
import { FluidLayout } from '../../../layout/FluidLayout';
import { FullLayout } from '../../../layout/FullLayout';
import { Create } from '../detail/Create';
import { Detail } from '../detail/Detail';
import { Table } from '../table/Table';

export interface ListViewProps {
  view: ViewSchema;
  atomName: string;
}

export const ListView: FunctionComponent<ListViewProps> = ({
  view,
  atomName,
}) => {
  const [metadata] = useMetadataByAtom(atomName);

  if (!metadata) {
    return (
      <FluidLayout>
        <Skeleton />
      </FluidLayout>
    );
  }

  return (
    <FullLayout>
      <PageHeader label={view.label} />
      <Switch>
        <Route path={RoutePath.ViewDetail}>
          <Detail view={view} metadata={metadata} />
        </Route>
        <Route path={RoutePath.ViewCreate}>
          <Create view={view} metadata={metadata} />
        </Route>
        <Route path={RoutePath.ViewPage}>
          <Table view={view} metadata={metadata} />
        </Route>
      </Switch>
    </FullLayout>
  );
};
