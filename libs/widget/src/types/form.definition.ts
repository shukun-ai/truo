/* eslint-disable */
/* tslint:disable */
/**
 * This file was automatically generated by SHUKUN.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run SHUKUN to regenerate this file.
 */

export type FormDefinitionProps = {
  value?: FormDefinitionValue;
  submitButtonText?: FormDefinitionSubmitButtonText;
  resetButtonText?: FormDefinitionResetButtonText;
  cancelButtonText?: FormDefinitionCancelButtonText;
  submit?: (payload: FormDefinitionSubmit) => void;
};

export interface FormDefinitionValue {
  [k: string]: unknown;
}

export type FormDefinitionSubmitButtonText = string;

export type FormDefinitionResetButtonText = string;

export type FormDefinitionCancelButtonText = string;

export interface FormDefinitionSubmit {
  [k: string]: unknown;
}
