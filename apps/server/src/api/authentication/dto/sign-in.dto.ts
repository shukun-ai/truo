import { ApiProperty } from '@nestjs/swagger';
import { SignInDto as BaseSignInDto } from '@shukun/api';
import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly username!: BaseSignInDto['username'];

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @ApiProperty()
  readonly password!: BaseSignInDto['password'];
}
