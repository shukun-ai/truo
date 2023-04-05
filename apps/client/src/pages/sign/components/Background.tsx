import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

export interface BackgroundProps {}

export const Background: LegacyFunctionComponent<BackgroundProps> = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundImage:
          'url(https://source.unsplash.com/random/800x800?nature,dark)',
        backgroundSize: 'cover',
      }}
    ></div>
  );
};
