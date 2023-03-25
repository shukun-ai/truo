/* eslint-disable */
/* tslint:disable */
/**
 * This file was automatically generated by SHUKUN.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run SHUKUN to regenerate this file.
 */

export type TextDefinitionProps = {
  value?: TextDefinitionValue;
  textColor?: TextDefinitionTextColor;
  textAlign: TextDefinitionTextAlign;
  level: TextDefinitionLevel;
};

export type TextDefinitionValue = string;

export type TextDefinitionTextColor = string;

export type TextDefinitionTextAlign = 'center' | 'justify' | 'left' | 'right';

export type TextDefinitionLevel =
  | 'body1'
  | 'body2'
  | 'body3'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';
