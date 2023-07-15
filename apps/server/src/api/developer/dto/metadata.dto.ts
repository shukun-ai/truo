import { MetadataReviseSchema } from '@shukun/schema';
import { IsNotEmpty } from 'class-validator';

export class MetadataPushDto {
  // TODO validate connector type here.
  @IsNotEmpty()
  readonly definition!: Record<string, MetadataReviseSchema>;
}
