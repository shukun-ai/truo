export type TextWidgetProps = {
  value?: string;
  align?: 'left' | 'right' | 'center' | 'justify';
  color?: string;
  italic?: boolean;
  lineClamp?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  strikethrough?: boolean;
  transform?:
    | 'none'
    | 'revert'
    | 'capitalize'
    | 'lowercase'
    | 'uppercase'
    | 'full-width';
  truncate?: boolean;
  underline?: boolean;
  weight?: number;
};
