export const IDString = 'IDString';
export const DateTimeIsoString = 'DateTimeIsoString';
export const AttachmentSchema = 'AttachmentSchema';

export function extractShard(): string {
  return `import { ${AttachmentSchema} } from "@shukun/schema"; export type ${IDString} = string; export type ${DateTimeIsoString} = string;`;
}
