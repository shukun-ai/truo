import { CustomMode } from '@shukun/api';
import {
  MetadataSchema,
  ViewV2Ribbon,
  ViewV2LinkType,
  ViewSchema,
} from '@shukun/schema';
import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
} from 'react';

import { Ribbon } from '../../../../components/ribbon';
import { FormContext } from '../form/FormContext';
import { RibbonCustomButton } from '../ribbon/RibbonCustomButton';
import { RibbonCustomModalButton } from '../ribbon/RibbonCustomModalButton';

import { DetailBackButton } from './ribbons/DetailBackButton';
import { DetailEditButton } from './ribbons/DetailEditButton';
import { DetailPrintButton } from './ribbons/DetailPrintButton';
import { DetailRefreshButton } from './ribbons/DetailRefreshButton';
import { DetailRemoveButton } from './ribbons/DetailRemoveButton';

export interface DetailRibbonProps {
  viewRibbons: ViewV2Ribbon[];
  view: ViewSchema;
  metadata: MetadataSchema;
}

export const DetailRibbon: FunctionComponent<DetailRibbonProps> = ({
  viewRibbons,
  view,
  metadata,
}) => {
  const { row } = useContext(FormContext);

  const customRibbons = useCallback<(viewRibbon: ViewV2Ribbon) => ReactNode>(
    (viewRibbon) => {
      switch (viewRibbon.type) {
        case ViewV2LinkType.UpdateOne:
          return (
            <DetailEditButton
              key={viewRibbon.name}
              viewRibbon={viewRibbon}
              source={row}
              sources={row ? [row] : []}
            />
          );
        case ViewV2LinkType.DeleteOne:
          return (
            <DetailRemoveButton
              key={viewRibbon.name}
              metadata={metadata}
              viewRibbon={viewRibbon}
              source={row}
              sources={row ? [row] : []}
            />
          );
        case ViewV2LinkType.Print:
          return (
            <DetailPrintButton
              key={viewRibbon.name}
              viewRibbon={viewRibbon}
              source={row}
              sources={row ? [row] : []}
            />
          );
        case ViewV2LinkType.CustomModal:
          return (
            <RibbonCustomModalButton
              key={viewRibbon.name}
              customMode={CustomMode.DetailModal}
              view={view}
              metadata={metadata}
              viewRibbon={viewRibbon}
              sources={row ? [row] : []}
            />
          );
        default:
          return (
            <RibbonCustomButton
              key={viewRibbon.name}
              viewRibbon={viewRibbon}
              source={row}
              sources={row ? [row] : []}
            />
          );
      }
    },
    [row, view, metadata],
  );

  return (
    <Ribbon>
      <DetailBackButton />
      <DetailRefreshButton metadata={metadata} source={row} />
      {viewRibbons.map((viewRibbon) => customRibbons(viewRibbon))}
    </Ribbon>
  );
};
