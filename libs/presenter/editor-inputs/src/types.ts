import { DevtoolLogs } from '@shukun/presenter/definition';
import { ReactNode } from 'react';

export type CommonInputProps = {
  label?: string;
  secondaryLabel?: string;
  description?: string;
  error?: ReactNode;
  disabled?: boolean;
  disabledSimpleMode?: boolean;
  disabledJsMode?: boolean;
  logs?: DevtoolLogs;
};
