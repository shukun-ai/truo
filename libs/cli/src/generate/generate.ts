import { readFile, readdir } from 'fs/promises';
import { join } from 'path';

import {
  ApplicationSchema,
  MetadataSchema,
  RoleSchema,
  validateApplicationSchema,
  ViewSchema,
  WorkflowSchema,
} from '@shukun/schema';
import { ModuleKind, ScriptTarget, transpile } from 'typescript';
import { minify } from 'uglify-js';
import { sync } from 'write';

export interface GenerateOptions {
  inputPath: string;
  outputPath: string;
}

export async function generate(options: GenerateOptions) {
  const { inputPath, outputPath } = options;

  const application = await readApplication(inputPath);
  const metadata = await readSection<MetadataSchema>(inputPath, 'metadata');
  const views = await readSection<ViewSchema>(inputPath, 'views');
  const workflows = await readSection<WorkflowSchema>(inputPath, 'workflows');
  const roles = await readSection<RoleSchema>(inputPath, 'roles');
  application.metadata = metadata;
  application.views = views;
  application.workflows = workflows;
  application.roles = roles;

  const text = await validateAndStringify(application);
  const replacedText = await replaceCode(text, inputPath);

  await writeFile(replacedText, outputPath);

  return { success: true };
}

async function readApplication(inputPath: string): Promise<ApplicationSchema> {
  const application = await readFile(join(inputPath, 'application.json'), {
    encoding: 'utf-8',
  });

  const json: ApplicationSchema = JSON.parse(application);
  delete json.$schema;
  return json;
}

async function readSection<T>(
  inputPath: string,
  moduleName: string,
): Promise<T[]> {
  const path = join(inputPath, moduleName);
  const files = await readdir(path);
  const jsonFiles = files.filter((file) => file.endsWith('.json'));

  const section: T[] = [];

  for (const jsonFile of jsonFiles) {
    const string = await readFile(join(path, jsonFile), {
      encoding: 'utf-8',
    });

    const json = JSON.parse(string);

    delete json.$schema;

    section.push(json);
  }

  return section;
}

async function validateAndStringify(
  application: ApplicationSchema,
): Promise<string> {
  const result = validateApplicationSchema(application);

  if (!result) {
    console.error(validateApplicationSchema.errors);
    throw new Error('Failed to validate this application schema.');
  }

  const text = JSON.stringify(application, null, 4);

  return text;
}

async function writeFile(text: string, outputPath: string): Promise<void> {
  sync(join(outputPath, 'application.json'), text, {
    newline: true,
  });
}

async function replaceCode(text: string, inputPath: string): Promise<string> {
  const replacedCode = text.match(/{{code:[\w./]*}}/g);

  if (!replacedCode) {
    return text;
  }

  let replacedText = text;
  console.log(text, replacedCode);

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

export async function compile(code: string) {
  const transpiled = transpile(code, {
    module: ModuleKind.ES2020,
    target: ScriptTarget.ES2020,
    sourceMap: false,
    strict: true,
  });
  const { code: minified } = minify(transpiled);
  const json = JSON.stringify(minified);
  const text = json.substring(1, json.length - 1);

  return text;
}
