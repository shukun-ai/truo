import { WidgetSchema } from '@shukun/schema';

import buttonDefinitionJson from './button.definition.json';
import codeDefinitionJson from './code.definition.json';
import inputDefinitionJson from './input.definition.json';
import textDefinitionJson from './text.definition.json';

export const buttonDefinition = buttonDefinitionJson as WidgetSchema;
export const codeDefinition = codeDefinitionJson as WidgetSchema;
export const inputDefinition = inputDefinitionJson as WidgetSchema;
export const textDefinition = textDefinitionJson as WidgetSchema;
