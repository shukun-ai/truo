import { UnknownSourceModel } from '@shukun/schema';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import format from 'string-format';

import { RoutePath, useOrgPath } from '../../../utils/history-provider';

export function useViewLink(
  source: UnknownSourceModel | undefined,
  query: string | undefined,
  value: string | undefined,
) {
  const history = useHistory();
  const viewPrefixOrgPath = useOrgPath(RoutePath.ViewPrefix);

  const handler = useCallback(() => {
    const search = query ? format(query, source || []) : undefined;

    history.push({
      pathname: `${viewPrefixOrgPath}/${value}`,
      search,
    });
  }, [history, query, source, value, viewPrefixOrgPath]);

  return handler;
}

export function useShowRowLink(
  viewName: string,
  source: UnknownSourceModel | undefined,
) {
  const history = useHistory();
  const viewDetailOrgPath = useOrgPath(RoutePath.ViewDetail);

  const handler = useCallback(() => {
    if (source) {
      history.push({
        pathname: viewDetailOrgPath
          .replace(':viewName', viewName)
          .replace(':sourceId', source._id),
      });
    }
  }, [history, viewName, source, viewDetailOrgPath]);

  return handler;
}
