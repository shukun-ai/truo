import { readFile } from 'fs/promises';
import { join } from 'path';

export function getRegex() {
  return /{{code:[\w./\-_]*}}/g;
}

export async function replaceCode(
  text: string,
  inputPath: string,
  compile: (text: string) => Promise<string>,
): Promise<string> {
  const replacedCode = text.match(getRegex());

  if (!replacedCode) {
    return text;
  }

  let replacedText = text;

  for (const placeholder of replacedCode) {
    const name = placeholder.substring(7, placeholder.length - 2);
    const code = await readFile(join(inputPath, 'code', `${name}.ts`), {
      encoding: 'utf-8',
    });
    const compiledCode = await compile(code);
    replacedText = replacedText.replace(placeholder, compiledCode);
  }

  return replacedText;
}
