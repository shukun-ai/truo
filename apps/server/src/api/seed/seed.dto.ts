import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';

import {
  IsEngineName,
  IsNotDoubleUnderscore,
  IsStartedWithLowercase,
} from '../../util/validation/decorators';

export class SeedCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsEngineName()
  @IsStartedWithLowercase()
  @IsNotDoubleUnderscore()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly label: string;

  @IsNotEmpty()
  @IsString()
  @IsEngineName()
  @MinLength(2)
  @MaxLength(30)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  readonly password: string;
}
