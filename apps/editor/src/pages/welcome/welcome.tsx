import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { ChooseDirectory } from './choose-directory';

export interface WelcomeProps {}

export const Welcome: LegacyFunctionComponent<WelcomeProps> = () => {
  return <ChooseDirectory></ChooseDirectory>;
};
