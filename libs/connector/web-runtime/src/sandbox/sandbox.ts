import { HandlerContext } from '@shukun/connector/handler';

export const runSandbox = (code: string, context: HandlerContext): unknown => {
  const $ = prepareVMContext(context);
  const $$ = prepareVMResolver();
  const func = new Function('$', '$$', wrapper(code));

  try {
    const data: unknown = func($, $$);
    return serialize(data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw error;
    }
  }
};

const wrapper = (code: string) => {
  return code;
};

const prepareVMContext = (context: HandlerContext): HandlerContext => {
  return structuredClone(context);
};

const prepareVMResolver = () => {
  return structuredClone({});
};

const serialize = (data: unknown): unknown => {
  return JSON.parse(JSON.stringify(data));
};
