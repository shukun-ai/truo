import { RoleResourceType, ViewType } from '@shukun/schema';
import { useUpdateEffect } from 'ahooks';
import { Skeleton } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { NoAccessTip } from '../../components/layout';
import { searchService } from '../../services/search';
import { metadataService } from '../../services/metadata';
import { grantList$, grantRoles$, isGranted } from '../../services/security';
import { sourceService } from '../../services/source';
import { views$ } from '../../services/view';
import { FluidLayout } from '../layout/FluidLayout';

import { CustomView } from './components/custom/CustomView';
import { ListView } from './components/list/ListView';

export interface ViewFactoryProps {}

export const ViewFactory: FunctionComponent<ViewFactoryProps> = () => {
  const views = useObservableState(views$, []);

  const { viewName } = useParams<{ viewName: string }>();

  const view = useMemo(() => {
    return views.find((item) => item.name === viewName);
  }, [views, viewName]);

  const atomName = useMemo(() => {
    return view?.atomName;
  }, [view]);

  useEffect(() => {
    if (atomName) {
      metadataService.fetchOneIfNull(atomName);
    }
  }, [atomName]);

  useEffect(() => {
    return () => {
      sourceService.reset();
    };
  }, [view?.name]);

  const grantList = useObservableState(grantList$, null);

  const grantRoles = useObservableState(grantRoles$, null);

  const isGrantedView = useMemo<boolean | null>(() => {
    if (!view) {
      return null;
    }

    return isGranted({
      grantList,
      grantRoles,
      resource: `${RoleResourceType.View}/${view.name}`,
      action: 'read:any',
    });
  }, [grantList, grantRoles, view]);

  useUpdateEffect(() => {
    if (view) {
      searchService.setActive(view.name, view.search ?? null);
    }
  }, [view]);

  if (!view || isGrantedView === null) {
    return (
      <FluidLayout>
        <Skeleton />
      </FluidLayout>
    );
  }

  if (isGrantedView === false) {
    return (
      <FluidLayout>
        <NoAccessTip
          title="无法访问"
          message="您可能访问不了当前页面，因为该页面未开通访问权限"
          description="建议点击其他可以访问的页面或联系管理员"
        />
      </FluidLayout>
    );
  }

  if (view.type === ViewType.Menu) {
    return <FluidLayout>菜单项</FluidLayout>;
  }

  if (view.type === ViewType.Simple) {
    if (!atomName) {
      return (
        <FluidLayout>
          <Skeleton />
        </FluidLayout>
      );
    } else {
      return <ListView view={view} atomName={atomName} />;
    }
  }

  // if (view.type === ViewType.Tree) {
  //   if (!atomName) {
  //     return (
  //       <FluidLayout>
  //         <Skeleton />
  //       </FluidLayout>
  //     );
  //   } else {
  //     return <TreeView view={view} atomName={atomName} />;
  //   }
  // }

  if (view.type === ViewType.Custom) {
    return <CustomView view={view} />;
  }

  return <div>Unsupported type</div>;
};
