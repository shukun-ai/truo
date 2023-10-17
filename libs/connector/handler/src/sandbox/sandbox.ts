import { NodeVM } from 'vm2';

import { HandlerContext } from '../types';

export const runSandbox = (code: string, context: HandlerContext): unknown => {
  const vm = new NodeVM();
  const exports = vm.run(wrapper(code));
  const $ = prepareVMContext(context);
  const $$ = prepareVMResolver();

  try {
    const data: unknown = exports.default($, $$);
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
  return `
        exports.default = ($, $$) => {
            ${code}
        }
    `;
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
