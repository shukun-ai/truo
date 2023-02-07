import { ApplicationSchema } from '@shukun/schema';
import { format } from 'prettier';

import { extractAtom } from './helpers/extract-atom';
import { extractElectronOptions } from './helpers/extract-electron-options';
import { extractMetadataToTypes } from './helpers/extract-metadata';
import { extractShard } from './helpers/extract-shared';
import {
  DEFAULT_BANNER_COMMENT,
  TypeGeneratorOptions,
} from './type.generator.type';

export class TypeGenerator {
  generate(lowCode: ApplicationSchema, options?: TypeGeneratorOptions) {
    let text = '';
    text += options?.bannerComment ?? DEFAULT_BANNER_COMMENT;
    text += '\n';
    text += extractShard();
    text += extractMetadataToTypes(
      lowCode,
      extractAtom,
      extractElectronOptions,
    );

    return format(text, { ...options?.style, parser: 'babel' });
  }
}
