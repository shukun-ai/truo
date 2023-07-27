import { TablerIconsProps } from '@tabler/icons-react';

import { iconsMap } from './icon-map';

export type IconProps = {
  type: keyof typeof iconsMap;
} & TablerIconsProps;

export const Icon = ({ type, ...props }: IconProps) => {
  const Component = iconsMap[type];
  return <Component {...props} />;
};
