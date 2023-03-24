/* eslint-disable */
/* tslint:disable */
/**
 * This file was automatically generated by SHUKUN.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run SHUKUN to regenerate this file.
 */

export type ButtonDefinitionProps = {
  text?: ButtonDefinitionText;
  variant: ButtonDefinitionVariant;
  color: ButtonDefinitionColor;
  size: ButtonDefinitionSize;
  disabled: ButtonDefinitionDisabled;
  loading: ButtonDefinitionLoading;
  fullWidth: ButtonDefinitionFullWidth;
  click?: (payload: ButtonDefinitionClick) => void;
};

export type ButtonDefinitionText = string;

export type ButtonDefinitionVariant = 'solid' | 'outlined' | 'plain' | 'soft';

export type ButtonDefinitionColor =
  | 'primary'
  | 'neutral'
  | 'success'
  | 'danger'
  | 'info'
  | 'warning';

export type ButtonDefinitionSize = 'sm' | 'md' | 'lg';

export type ButtonDefinitionDisabled = boolean;

export type ButtonDefinitionLoading = boolean;

export type ButtonDefinitionFullWidth = boolean;

export interface ButtonDefinitionClick {
  [k: string]: unknown;
}
