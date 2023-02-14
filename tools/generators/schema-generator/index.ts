import { Tree, readProjectConfiguration } from '@nrwl/devkit';
import { readFile } from 'fs/promises';
import { writeFileSync } from 'fs';
import { join } from 'path';

import { compileFromFile } from 'json-schema-to-typescript';

export default async function (tree: Tree, schema: any) {
  if (schema.name !== 'schema') {
    throw new Error(
      'We only support use this command for @shukun/schema library.',
    );
  }

  const projectConfiguration = readProjectConfiguration(tree, schema.name);
  generate(tree.root, projectConfiguration.root);
}

async function generate(treeRoot: string, projectRoot: string) {
  const text = await readFile(join(treeRoot, '.prettierrc'), {
    encoding: 'utf-8',
  });
  const prettierConfig = JSON.parse(text);

  const comment =
    '/* eslint-disable */\n/* tslint:disable */\n/**\n* This file was automatically generated by json-schema-to-typescript.\n* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,\n* and run json-schema-to-typescript to regenerate this file.\n*/';
  const originFolder = 'json-schemas';
  const targetFolder = 'types';

  const list = [
    'application',
    'attachments',
    'http-query',
    'flow-compiled-codes',
    'exception',
    'data-source',
    'player',
    'widget',
  ];

  const queue = list.map(async (fileName: string) => {
    const ts = await compileFromFile(
      join(
        treeRoot,
        projectRoot,
        'src',
        originFolder,
        `${fileName}.schema.json`,
      ),
      {
        bannerComment: comment,
        cwd: join(treeRoot, projectRoot, 'src', originFolder),
        enableConstEnums: false,
        format: true,
        style: {
          printWidth: 80,
          ...prettierConfig,
        },
      },
    );

    writeFileSync(
      join(treeRoot, projectRoot, 'src', targetFolder, `${fileName}.ts`),
      ts,
    );
  });

  Promise.all(queue).then(() =>
    console.log('Generate type files successfully.'),
  );
}
