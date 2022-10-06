import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInWithEncryptDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly username!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly encryptPassword!: string;
}
