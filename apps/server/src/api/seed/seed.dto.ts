import { SeedCreateDto as BaseSeedCreateDto } from '@shukun/api';
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
  readonly name!: BaseSeedCreateDto['name'];

  @IsNotEmpty()
  @IsString()
  readonly label!: BaseSeedCreateDto['label'];

  @IsNotEmpty()
  @IsString()
  @IsEngineName()
  @MinLength(2)
  @MaxLength(30)
  readonly username!: BaseSeedCreateDto['username'];

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  readonly password!: BaseSeedCreateDto['password'];
}
