import { LegacyFunctionComponent } from '@shukun/component';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';

import { Brand } from '../../components/brand';
import { org$ } from '../../services/global';

export interface OrgBrandProps {
  theme?: 'light' | 'dark';
  onClick?: () => void;
}

export const OrgBrand: LegacyFunctionComponent<OrgBrandProps> = ({
  theme,
  onClick,
}) => {
  const org = useObservableState(org$);

  const logo = useMemo(() => {
    if (!org) {
      return <></>;
    } else if (theme === 'dark' && org.darkLogo) {
      return <img src={org.darkLogo} alt={org.label} height="36px" />;
    } else if (theme === 'light' && org.lightLogo) {
      return <img src={org.lightLogo} alt={org.label} height="36px" />;
    } else {
      return <Brand theme={theme} />;
    }
  }, [org, theme]);

  return (
    <div
      style={{ cursor: 'pointer', height: 36, overflow: 'hidden' }}
      onClick={onClick}
    >
      {logo}
    </div>
  );
};
