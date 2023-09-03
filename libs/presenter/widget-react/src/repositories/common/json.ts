import { CodeMode } from '@shukun/schema';

export const parseJson = (template: string) => {
  if (template.startsWith(CodeMode.JSON)) {
    const code = template.slice(CodeMode.JSON.length, template.length);
    return runJson(code);
  }
  return template;
};

const runJson = (code: string): unknown => {
  const json = JSON.parse(code);
  return json;
};
