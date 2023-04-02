import { SystemPublicOrgModel } from '@shukun/schema';
import { useMemo } from 'react';

import { ShukunBrand } from './shukun-brand';

export interface OrgBrandProps {
  theme?: 'light' | 'dark';
  org?: SystemPublicOrgModel;
  onClick?: () => void;
}

export const OrgBrand = ({ theme, org, onClick }: OrgBrandProps) => {
  const logo = useMemo(() => {
    if (!org) {
      return null;
    } else if (theme === 'dark' && org.darkLogo) {
      return <img src={org.darkLogo} alt={org.label} height="36px" />;
    } else if (theme === 'light' && org.lightLogo) {
      return <img src={org.lightLogo} alt={org.label} height="36px" />;
    } else {
      return <ShukunBrand theme={theme} />;
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
