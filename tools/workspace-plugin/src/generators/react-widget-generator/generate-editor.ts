`import { WidgetSchema } from '@shukun/schema';

import listJson from './widgets/list/list.widget.json';
import tableJson from './widgets/table/table.widget.json';
import tableColumnJson from './widgets/table-column/table-column.widget.json';
import textJson from './widgets/text/text.widget.json';

export const editorWidgets: Record<string, WidgetSchema> = {
  text: textJson as WidgetSchema,
  table: tableJson as WidgetSchema,
  tableColumn: tableColumnJson as WidgetSchema,
  list: listJson as WidgetSchema,
};`;

import { toCamelCase } from 'js-convert-case';

export const generateEditor = (directories: string[]) => {
  return `
    import { WidgetSchema } from '@shukun/schema';

    ${getImports(directories)}
    
    export const editorWidgets: Record<string, WidgetSchema> = {
      ${getProps(directories)}
    };
  `;
};

const getImports = (directories: string[]): string => {
  return directories
    .map((directory) => {
      return `import ${toCamelCase(
        directory,
      )}Json from './widgets/${directory}/${directory}.widget.json';`;
    })
    .join('\r');
};

const getProps = (directories: string[]): string => {
  return directories
    .map((directory) => {
      return `${toCamelCase(directory)}: ${toCamelCase(
        directory,
      )}Json as WidgetSchema,`;
    })
    .join('\r');
};
