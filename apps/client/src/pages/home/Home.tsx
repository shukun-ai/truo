import { LegacyFunctionComponent } from '@shukun/component';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from '../../utils/history-provider';

export interface HomeProps {}

export const Home: LegacyFunctionComponent<HomeProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const path = RoutePath.Hub;
    navigate(path, { replace: true });
  }, [navigate]);

  return null;
};
