import { EnvironmentSchema } from '@shukun/schema';
import { IsNotEmpty } from 'class-validator';

export class EnvironmentPushDto {
  // TODO validate connector type here.
  @IsNotEmpty()
  readonly definition!: Record<string, EnvironmentSchema>;
}
