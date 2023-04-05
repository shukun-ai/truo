import { LegacyFunctionComponent } from '@shukun/component';
import { MetadataSchema, UnknownSourceModel, ViewRibbon } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';
import {
  DetailMode,
  detailService,
  mode$,
} from '../../../../../services/detail';
import { RoutePath, useOrgPath } from '../../../../../utils/history-provider';
import { runStringCode } from '../../ribbon/runStringCode';

export interface DetailRemoveButtonProps {
  viewRibbon: ViewRibbon;
  metadata: MetadataSchema;
  source: UnknownSourceModel | null;
  sources: UnknownSourceModel[];
}

export const DetailRemoveButton: LegacyFunctionComponent<
  DetailRemoveButtonProps
> = ({ viewRibbon, metadata, source, sources }) => {
  const mode = useObservableState(mode$);

  const navigate = useNavigate();

  const { viewName } = useParams<{ viewName: string }>();

  const viewPageOrgPath = useOrgPath(RoutePath.ViewPage);

  const handleClick = useCallback(async () => {
    if (!source) {
      return;
    }
    const result = await detailService.removeOne(source._id, metadata);

    if (result && viewName) {
      navigate(viewPageOrgPath.replace(':viewName', viewName));
    }
  }, [source, metadata, viewName, navigate, viewPageOrgPath]);

  return (
    <RibbonButton
      name={viewRibbon.name}
      label={viewRibbon.label}
      icon={<AiOutlineDelete />}
      disabled={
        mode !== DetailMode.Show ||
        runStringCode(
          viewRibbon.disabledCode,
          source ?? undefined,
          sources,
          mode,
        )
      }
      disabledTip={viewRibbon.disabledTip}
      color={viewRibbon.color}
      onClick={handleClick}
      confirmedTip={viewRibbon.confirmedTip}
    />
  );
};
