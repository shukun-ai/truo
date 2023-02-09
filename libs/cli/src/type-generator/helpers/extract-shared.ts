export const IDString = 'IDString';
export const DateTimeIsoString = 'DateTimeIsoString';
export const AttachmentSchema = 'AttachmentSchema';

export function extractShard(): string {
  return `import { ${AttachmentSchema} } from "@shukun/schema";\n export type ${IDString} = string;\n export type ${DateTimeIsoString} = string;\n`;
}
