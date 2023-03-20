import { WidgetSchema } from '@shukun/schema';

import buttonDefinitionJson from './button.definition.json';
import codeDefinitionJson from './code.definition.json';
import groupDefinitionJson from './group.definition.json';
import inputDefinitionJson from './input.definition.json';
import listDefinitionJson from './list.definition.json';
import stackDefinitionJson from './stack.definition.json';
import textDefinitionJson from './text.definition.json';

export const buttonDefinition = buttonDefinitionJson as WidgetSchema;
export const codeDefinition = codeDefinitionJson as WidgetSchema;
export const groupDefinition = groupDefinitionJson as WidgetSchema;
export const inputDefinition = inputDefinitionJson as WidgetSchema;
export const listDefinition = listDefinitionJson as WidgetSchema;
export const stackDefinition = stackDefinitionJson as WidgetSchema;
export const textDefinition = textDefinitionJson as WidgetSchema;
