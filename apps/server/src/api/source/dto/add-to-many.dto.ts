import { IsNotEmpty, IsString } from 'class-validator';
import { IDString } from '../../../app.type';

export class AddToManyDto {
  @IsNotEmpty()
  @IsString()
  electronName: string;

  @IsNotEmpty()
  @IsString()
  foreignId: IDString;
}
