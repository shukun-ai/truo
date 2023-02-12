import {
  evaluateParsedString,
  parseStringTemplateGenerator,
} from 'string-template-parser';

import {
  ITemplateParser,
  TemplateLiteral,
} from '../interface/template-parser.interface';

export class TemplateParser implements ITemplateParser {
  parseStringTemplate = parseStringTemplateGenerator({
    VARIABLE_START: /^\{\{\s*/,
    VARIABLE_END: /^\s*\}\}/,
  });

  parse(template: string): TemplateLiteral {
    return this.parseStringTemplate(template);
  }

  evaluate(templateLiteral: TemplateLiteral, variables: unknown[]): string {
    const keyValue: Record<string, unknown> = {};

    variables.forEach((item, index) => {
      const key = templateLiteral.variables[index].name;
      keyValue[key] = item;
    });

    return evaluateParsedString(templateLiteral, keyValue, {});
  }
}
