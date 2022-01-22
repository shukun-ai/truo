import { MetadataSchema, ViewV2Ribbon } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useHistory, useParams } from 'react-router';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';
import { UnknownSourceModel } from '../../../../../models/source';
import {
  DetailMode,
  detailService,
  mode$,
} from '../../../../../services/detail';
import { RoutePath, useOrgPath } from '../../../../../utils/history-provider';
import { runStringCode } from '../../ribbon/runStringCode';

export interface DetailRemoveButtonProps {
  viewRibbon: ViewV2Ribbon;
  metadata: MetadataSchema;
  source: UnknownSourceModel | null;
  sources: UnknownSourceModel[];
}

export const DetailRemoveButton: FunctionComponent<DetailRemoveButtonProps> = ({
  viewRibbon,
  metadata,
  source,
  sources,
}) => {
  const mode = useObservableState(mode$);

  const history = useHistory();

  const { viewName } = useParams<{ viewName: string }>();

  const viewPageOrgPath = useOrgPath(RoutePath.ViewPage);

  const handleClick = useCallback(async () => {
    if (!source) {
      return;
    }
    const result = await detailService.removeOne(source._id, metadata);

    if (result) {
      history.push(viewPageOrgPath.replace(':viewName', viewName));
    }
  }, [source, metadata, history, viewPageOrgPath, viewName]);

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
    />
  );
};
