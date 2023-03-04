import { ViewSchema } from '@shukun/schema';
import { Skeleton } from 'antd';
import React, { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageHeader } from '../../../../components/page';
import { useMetadataByAtom } from '../../../../services/metadata';
import { RoutePath } from '../../../../utils/history-provider';
import { getNestedRoute } from '../../../../utils/history-provider/nested';
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
      <Routes>
        <Route
          path={getNestedRoute(RoutePath.ViewPage, RoutePath.ViewDetail)}
          element={<Detail view={view} metadata={metadata} />}
        />
        <Route
          path={getNestedRoute(RoutePath.ViewPage, RoutePath.ViewCreate)}
          element={<Create view={view} metadata={metadata} />}
        />
        <Route
          path={getNestedRoute(RoutePath.ViewPage, RoutePath.ViewPage)}
          element={<Table view={view} metadata={metadata} />}
        />
      </Routes>
    </FullLayout>
  );
};
