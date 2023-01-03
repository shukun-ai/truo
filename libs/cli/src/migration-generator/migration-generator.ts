import { ApplicationSchema } from '@shukun/schema';
import { format, Options as FormatOptions } from 'prettier';

import { extractAtom } from './helpers/extract-atom';
import { extractMetadataToTypes } from './helpers/extract-metadata';
import { extractShard } from './helpers/extract-shared';

export async function generateMigration({
  application,
  style,
  bannerComment = '/* eslint-disable */\n/* tslint:disable */\n/**\n* This file was automatically generated by SHUKUN json-schema.\n*/',
}: {
  application: ApplicationSchema;
  style?: FormatOptions;
  bannerComment?: string;
}) {
  let text = '';
  text += bannerComment;
  text += '\n';
  text += extractShard();
  text += extractMetadataToTypes(application, extractAtom);

  const formattedText = format(text, { ...style, parser: 'babel' });

  return formattedText;
}
