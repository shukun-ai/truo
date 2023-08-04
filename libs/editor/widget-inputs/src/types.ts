import { ReactNode } from 'react';

export type CommonInputProps = {
  label?: string;
  secondaryLabel?: string;
  description?: string;
  error?: ReactNode;
  disabled?: boolean;
};
