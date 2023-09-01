export type ButtonWidgetProps = {
  text?: string;
  variant?:
    | 'outline'
    | 'white'
    | 'light'
    | 'default'
    | 'filled'
    | 'gradient'
    | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: undefined;
};
