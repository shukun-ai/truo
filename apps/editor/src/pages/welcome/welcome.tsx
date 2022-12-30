import React, { FunctionComponent } from 'react';

import { ChooseDirectory } from './choose-directory';

export interface WelcomeProps {}

export const Welcome: FunctionComponent<WelcomeProps> = () => {
  return <ChooseDirectory></ChooseDirectory>;
};
