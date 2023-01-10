import { IDString } from '@shukun/schema';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddToManyDto {
  @IsNotEmpty()
  @IsString()
  electronName!: string;

  @IsNotEmpty()
  @IsString()
  foreignId!: IDString;
}
