import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @ApiProperty()
  readonly password!: string;
}
