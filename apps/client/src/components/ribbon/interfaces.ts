export interface RibbonItem {
  name: string;
  label: string;
  color?: string;
  icon?: any;
  disabled?: boolean;
  disabledTip?: string;
  confirmed?: boolean;
  confirmedTip?: string;
  onClick?: () => void | Promise<void>;
}
