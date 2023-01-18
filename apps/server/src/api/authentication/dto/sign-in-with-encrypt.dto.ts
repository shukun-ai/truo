import { ApiProperty } from '@nestjs/swagger';
import { EncryptSignInDto } from '@shukun/api';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInWithEncryptDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly username!: EncryptSignInDto['username'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly encryptPassword!: EncryptSignInDto['encryptPassword'];
}
