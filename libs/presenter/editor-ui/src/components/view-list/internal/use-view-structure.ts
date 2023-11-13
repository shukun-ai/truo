import { TreeMenuStructure } from '@shukun/component';
import { useMemo } from 'react';

import { ViewEntity } from '../../../editor-context';

export const useViewStructure = (views: Record<string, ViewEntity>) => {
  const structure = useMemo(() => {
    const structure: TreeMenuStructure = {
      root: [],
    };

    const viewsSet = Object.values(views).sort((a, b) => {
      return a.priority - b.priority;
    });

    viewsSet.forEach((view) => {
      if (!view.parentName) {
        structure.root.push(view.id);
      } else {
        const parentViewId = getViewId(views, view.parentName);
        if (!parentViewId) {
          return;
        } else if (!structure[parentViewId]) {
          structure[parentViewId] = [view.id];
        } else {
          structure[parentViewId].push(view.id);
        }
      }
    });

    return structure;
  }, [views]);

  return structure;
};

const getViewId = (views: Record<string, ViewEntity>, viewName: string) => {
  const view = Object.values(views).find((view) => {
    return view.name === viewName;
  });

  return view?.id;
};
