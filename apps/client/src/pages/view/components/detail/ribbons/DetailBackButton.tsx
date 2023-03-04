import React, { FunctionComponent } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';
import { RoutePath, useOrgPath } from '../../../../../utils/history-provider';

export interface DetailBackButtonProps {}

export const DetailBackButton: FunctionComponent<
  DetailBackButtonProps
> = () => {
  const navigate = useNavigate();
  const { viewName } = useParams<{ viewName: string }>();
  const viewPrefixOrgPath = useOrgPath(RoutePath.ViewPrefix);

  return (
    <RibbonButton
      name="back"
      label="返回"
      icon={<AiOutlineLeft />}
      onClick={() => {
        navigate(`${viewPrefixOrgPath}/${viewName}`);
      }}
    />
  );
};
