import { ConnectorSchema } from '@shukun/schema';
import { IsNotEmpty } from 'class-validator';

export class ConnectorPushDto {
  // TODO validate connector type here.
  @IsNotEmpty()
  readonly definition!: Record<string, ConnectorSchema>;
}
