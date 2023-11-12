import { ViewSchema } from '@shukun/schema';
import { IsNotEmpty } from 'class-validator';

export class ViewPushDto {
  // TODO validate connector type here.
  @IsNotEmpty()
  readonly definition!: Record<string, ViewSchema>;
}
