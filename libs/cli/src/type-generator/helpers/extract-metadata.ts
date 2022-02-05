import { ApplicationSchema } from '@shukun/schema';
import { extractAtom } from './extract-atom';
import { extractElectronOptions } from './extract-electron-options';

export function extractMetadataToTypes(
  application: ApplicationSchema,
  extractAtomFunction: typeof extractAtom,
  extractElectronOptionsFunction: typeof extractElectronOptions,
): string {
  let text = '';

  application.metadata?.forEach((atom) => {
    text += extractAtomFunction(atom);
    text += extractElectronOptionsFunction(atom);
  });

  return text;
}
