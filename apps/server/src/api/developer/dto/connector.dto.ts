import { ConnectorSchema } from '@shukun/schema';
import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';

import {
  IsEngineName,
  IsNotDoubleUnderscore,
  IsStartedWithLowercase,
} from '../../../util/validation/decorators';

export class ConnectorCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsEngineName()
  @IsStartedWithLowercase()
  @IsNotDoubleUnderscore()
  @MinLength(2)
  @MaxLength(30)
  readonly connectorName!: string;

  // TODO validate connector type here.
  @IsNotEmpty()
  readonly connector!: ConnectorSchema;
}

export class ConnectorRemoveDto {
  @IsNotEmpty()
  @IsString()
  @IsEngineName()
  @IsStartedWithLowercase()
  @IsNotDoubleUnderscore()
  @MinLength(2)
  @MaxLength(30)
  readonly connectorName!: string;
}
