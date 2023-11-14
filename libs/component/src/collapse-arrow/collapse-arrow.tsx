import {
  IconCaretDownFilled,
  IconCaretRightFilled,
  TablerIconsProps,
} from '@tabler/icons-react';

export type CollapseArrowProps = {
  open?: boolean;
} & TablerIconsProps;

export const CollapseArrow = ({ open, ...props }: CollapseArrowProps) => {
  if (open) {
    return <IconCaretDownFilled {...props} />;
  } else {
    return <IconCaretRightFilled {...props} />;
  }
};
