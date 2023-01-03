import { Options as FormatOptions } from 'prettier';

import { readApplication } from '../io/read-application';

import { writeFile } from '../io/write-file';

import { generateMigration } from './migration-generator';

export interface MigrationGeneratorOptions {
  inputFile: string;
  outputFile: string;
  style?: FormatOptions;
  bannerComment?: string;
}

export async function typeGenerator({
  inputFile,
  outputFile,
  style,
  bannerComment,
}: MigrationGeneratorOptions) {
  const application = await readApplication(inputFile);

  const formattedText = await generateMigration({
    application,
    style,
    bannerComment,
  });

  await writeFile(formattedText, outputFile);
}
