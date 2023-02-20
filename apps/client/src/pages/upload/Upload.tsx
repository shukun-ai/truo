import React, { FunctionComponent } from 'react';

import { FluidLayout } from '../layout/FluidLayout';

import { UploadCodebase } from './UploadCodebase';
import { UploadDataSource } from './UploadDataSource';

export interface UploadProps {}

export const Upload: FunctionComponent<UploadProps> = () => {
  return (
    <FluidLayout>
      <div style={{ marginBottom: 12 }}>
        <UploadCodebase />
      </div>
      <div>
        <UploadDataSource />
      </div>
    </FluidLayout>
  );
};
