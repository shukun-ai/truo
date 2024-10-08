import { readFileSync, writeFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';

import { join } from 'node:path';

import { Tree, readProjectConfiguration } from '@nx/devkit';
import { compileFromFile } from 'json-schema-to-typescript';
import { format } from 'prettier';

import { generateExports } from './generate-exports';

export default async function (
  tree: Tree,
  schema: {
    name: string;
    inputPath: string;
    outputPath: string;
  },
) {
  const { sourceRoot } = readProjectConfiguration(tree, schema.name);

  if (!sourceRoot) {
    console.error('there are no sourceRoot');
    return;
  }

  const prettierConfig = getPrettierConfig(join(tree.root, '.prettierrc'));

  const directories = await readDirectories(join(sourceRoot, schema.inputPath));

  const names = directories
    .filter(
      (directory) =>
        directory.endsWith('editor.json') ||
        directory.endsWith('presenter.json'),
    )
    .map((directory) =>
      directory.substring(0, directory.length - '.json'.length),
    );

  for (const name of names) {
    const code = await compile(
      join(sourceRoot, schema.inputPath),
      name,
      prettierConfig,
    );
    await writeFile(join(sourceRoot, schema.outputPath, `${name}.ts`), code);
  }

  await writeFile(
    join(sourceRoot, 'index.ts'),
    formatCode(generateExports(names, schema.outputPath), prettierConfig),
  );
}

const readDirectories = async (fullPath: string): Promise<string[]> => {
  const directories = await readdir(fullPath, {
    encoding: 'utf-8',
  });
  return directories;
};

const writeFile = async (fullPath: string, content: string): Promise<void> => {
  return writeFileSync(fullPath, content, { encoding: 'utf-8' });
};

const formatCode = (content: string, prettierConfig: any): string => {
  return format(content, {
    parser: 'typescript',
    ...prettierConfig,
  });
};

const compile = async (
  path: string,
  name: string,
  prettierConfig: any,
): Promise<string> => {
  const comment =
    '/* eslint-disable */\n/* tslint:disable */\n/**\n* This file was automatically generated by json-schema-to-typescript.\n* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,\n* and run json-schema-to-typescript to regenerate this file.\n*/';

  return await compileFromFile(join(path, `${name}.json`), {
    bannerComment: comment,
    cwd: path,
    enableConstEnums: false,
    format: true,
    style: {
      printWidth: 80,
      ...prettierConfig,
    },
  });
};

const getPrettierConfig = async (fullPath: string): Promise<any> => {
  const text = readFileSync(join(fullPath), {
    encoding: 'utf-8',
  });

  return JSON.parse(text);
};
