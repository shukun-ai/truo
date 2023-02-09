import { MetadataSchema, ViewRibbon } from '@shukun/schema';
import React, { FunctionComponent } from 'react';

import { Ribbon } from '../../../../components/ribbon';

import { DetailBackButton } from './ribbons/DetailBackButton';
import { DetailCreateButton } from './ribbons/DetailCreateButton';

export interface CreateRibbonProps {
  viewRibbons: ViewRibbon[];
  metadata: MetadataSchema;
}

export const CreateRibbon: FunctionComponent<CreateRibbonProps> = () => {
  return (
    <Ribbon>
      <DetailBackButton />
      <DetailCreateButton />
    </Ribbon>
  );
};
