import { tokenization } from './Tokenization';

type JsonTemplateMethod = (...args: any[]) => any;

export class JsonTemplate {
  scopeName: string;

  methodList: Record<string, JsonTemplateMethod>;

  constructor(
    scopeName: string,
    methodList: Record<string, JsonTemplateMethod>,
  ) {
    this.scopeName = scopeName;
    this.methodList = methodList;
  }

  compile(jsonLikeData: any): any {
    if (jsonLikeData === undefined) {
      return undefined;
    }

    if (jsonLikeData === null) {
      return null;
    }

    if (typeof jsonLikeData === 'boolean') {
      return jsonLikeData;
    }

    if (typeof jsonLikeData === 'number') {
      return jsonLikeData;
    }

    if (typeof jsonLikeData === 'string') {
      return this.transformString(jsonLikeData);
    }

    if (Array.isArray(jsonLikeData)) {
      return jsonLikeData.map((item) => this.compile(item));
    }

    if (typeof jsonLikeData === 'object') {
      return Object.keys(jsonLikeData).reduce((previous, current) => {
        return {
          ...previous,
          [current]: this.compile(jsonLikeData[current]),
        };
      }, {});
    }

    throw new Error(`We cannot parse JSON Data. The data is ${jsonLikeData}`);
  }

  transformString(value: string): any {
    if (value.startsWith(`${this.scopeName}.`) && value.endsWith(')')) {
      return this.applyFormula(value);
    }

    return value;
  }

  applyFormula(value: string): any {
    const ast = tokenization(value);

    const method = this.methodList[ast.methodName];

    if (!method) {
      throw new Error(
        `We cannot find specific method from list, the method name is ${ast.methodName}`,
      );
    }
    const output = method(...ast.arguments);
    return output;
  }
}
