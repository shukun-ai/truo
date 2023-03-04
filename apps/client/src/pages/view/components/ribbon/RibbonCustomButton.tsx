import { ViewRibbon, ViewLinkType, UnknownSourceModel } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router';
import format from 'string-format';

import { RibbonButton } from '../../../../components/ribbon/RibbonButton';
import { mode$ } from '../../../../services/detail';
import { RoutePath, useOrgPath } from '../../../../utils/history-provider';

import { runStringCode } from './runStringCode';

export interface RibbonCustomButtonProps {
  viewRibbon: ViewRibbon;
  source: UnknownSourceModel | null;
  sources: UnknownSourceModel[];
}

export const RibbonCustomButton: FunctionComponent<RibbonCustomButtonProps> = ({
  viewRibbon,
  source,
  sources,
}) => {
  const mode = useObservableState(mode$);
  const navigate = useNavigate();
  const viewPrefixOrgPath = useOrgPath(RoutePath.ViewPrefix);

  const handleClick = useCallback(() => {
    if (viewRibbon.type === ViewLinkType.View) {
      const search = viewRibbon.query
        ? format(viewRibbon.query, source || [])
        : undefined;

      navigate({
        pathname: `${viewPrefixOrgPath}/${viewRibbon.value}`,
        search,
      });
    }
  }, [
    navigate,
    source,
    viewPrefixOrgPath,
    viewRibbon.query,
    viewRibbon.type,
    viewRibbon.value,
  ]);

  return (
    <RibbonButton
      name={viewRibbon.name}
      label={viewRibbon.label}
      disabled={runStringCode(
        viewRibbon.disabledCode,
        source ?? undefined,
        sources,
        mode,
      )}
      color={viewRibbon.color}
      onClick={handleClick}
    />
  );
};
