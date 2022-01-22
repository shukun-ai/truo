import React, { FunctionComponent } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { useHistory, useParams } from 'react-router';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';
import { RoutePath, useOrgPath } from '../../../../../utils/history-provider';

export interface DetailBackButtonProps {}

export const DetailBackButton: FunctionComponent<
  DetailBackButtonProps
> = () => {
  const history = useHistory();
  const { viewName } = useParams<{ viewName: string }>();
  const viewPrefixOrgPath = useOrgPath(RoutePath.ViewPrefix);

  return (
    <RibbonButton
      name="back"
      label="返回"
      icon={<AiOutlineLeft />}
      onClick={() => {
        history.push(`${viewPrefixOrgPath}/${viewName}`);
      }}
    />
  );
};
