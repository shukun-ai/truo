import { ModuleKind, ScriptTarget, transpile } from 'typescript';
import { minify } from 'uglify-js';

export async function compileTs(code: string): Promise<string> {
  const transpiled = transpile(code, {
    module: ModuleKind.CommonJS,
    target: ScriptTarget.ES2020,
    sourceMap: false,
    strict: true,
  });
  const { code: minified } = minify(transpiled);
  const json = JSON.stringify(minified);
  const text = json.substring(1, json.length - 1);

  return text;
}
