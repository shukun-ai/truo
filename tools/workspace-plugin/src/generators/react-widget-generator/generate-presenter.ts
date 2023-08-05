`import { ReactWidget } from './abstracts/loader.interface';
import { ListWidget } from './widgets/list/list.widget';
import { TableWidget } from './widgets/table/table.widget';
import { TableColumnWidget } from './widgets/table-column/table-column.widget';
import { TextWidget } from './widgets/text/text.widget';

export const presenterWidgets: Record<string, ReactWidget> = {
  text: TextWidget,
  table: TableWidget,
  tableColumn: TableColumnWidget,
  list: ListWidget,
};`;

import { toPascalCase, toCamelCase } from 'js-convert-case';

export const generatePresenter = (directories: string[]) => {
  return `
    import { ReactWidget } from './abstracts/loader.interface';
    
    ${getImports(directories)}
    
    export const presenterWidgets: Record<string, ReactWidget> = {
      ${getProps(directories)}
    };
  `;
};

const getImports = (directories: string[]): string => {
  return directories
    .map((directory) => {
      return `import { ${toPascalCase(
        directory,
      )}Widget } from './widgets/${directory}/${directory}.widget';`;
    })
    .join('\r');
};

const getProps = (directories: string[]): string => {
  return directories
    .map((directory) => {
      return `${toCamelCase(directory)}: ${toPascalCase(directory)}Widget,`;
    })
    .join('\r');
};
