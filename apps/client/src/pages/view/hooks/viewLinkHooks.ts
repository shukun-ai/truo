import { UnknownSourceModel } from '@shukun/schema';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import format from 'string-format';

import { RoutePath, useOrgPath } from '../../../utils/history-provider';

export function useViewLink(
  source: UnknownSourceModel | undefined,
  query: string | undefined,
  value: string | undefined,
) {
  const navigate = useNavigate();
  const viewPrefixOrgPath = useOrgPath(RoutePath.ViewPrefix);

  const handler = useCallback(() => {
    const search = query ? format(query, source || []) : undefined;

    navigate({
      pathname: `${viewPrefixOrgPath}/${value}`,
      search,
    });
  }, [navigate, query, source, value, viewPrefixOrgPath]);

  return handler;
}

export function useShowRowLink(
  viewName: string,
  source: UnknownSourceModel | undefined,
) {
  const navigate = useNavigate();
  const viewDetailOrgPath = useOrgPath(RoutePath.ViewDetail);

  const handler = useCallback(() => {
    if (source) {
      navigate({
        pathname: viewDetailOrgPath
          .replace(':viewName', viewName)
          .replace(':sourceId', source._id),
      });
    }
  }, [source, navigate, viewDetailOrgPath, viewName]);

  return handler;
}
