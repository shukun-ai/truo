import { readFileSync, writeFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';

import { join } from 'node:path';

import { Tree, readProjectConfiguration } from '@nx/devkit';
import { WidgetSchema } from '@shukun/schema';
import { format } from 'prettier';

import { generatorTypes } from './generator';

export default async function (
  tree: Tree,
  schema: { name: string; path: string },
) {
  const { sourceRoot } = readProjectConfiguration(tree, schema.name);

  if (!sourceRoot) {
    console.error('there are no sourceRoot');
    return;
  }

  const directories = await readDirectories(join(sourceRoot, schema.path));

  for (const directory of directories) {
    const content = await readFile(
      join(sourceRoot, schema.path, directory, `${directory}.widget.json`),
    );
    if (!content) {
      return;
    }
    const widgetDefinition = parseJson(content);

    const output = generatorTypes(directory, widgetDefinition);

    const code = formatCode(join(tree.root, '.prettierrc'), output);

    await writeFile(
      join(sourceRoot, schema.path, directory, `${directory}.props.ts`),
      code,
    );
  }
}

const readDirectories = async (fullPath: string): Promise<string[]> => {
  const directories = await readdir(fullPath, {
    encoding: 'utf-8',
  });
  return directories;
};

const readFile = async (fullPath: string): Promise<string | null> => {
  try {
    return readFileSync(fullPath, { encoding: 'utf-8' });
  } catch {
    return null;
  }
};

const writeFile = async (fullPath: string, content: string): Promise<void> => {
  return writeFileSync(fullPath, content, { encoding: 'utf-8' });
};

const parseJson = (content: string): WidgetSchema => {
  try {
    return JSON.parse(content) as WidgetSchema;
  } catch {
    throw new Error('The JSON format is not correct.');
  }
};

const formatCode = (fullPath: string, content: string): string => {
  const text = readFileSync(join(fullPath), {
    encoding: 'utf-8',
  });

  const prettierConfig = JSON.parse(text);

  return format(content, {
    parser: 'typescript',
    ...prettierConfig,
  });
};
