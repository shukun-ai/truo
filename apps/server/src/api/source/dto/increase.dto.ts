import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class IncreaseDto {
  @IsNotEmpty()
  @IsString()
  electronName!: string;

  @IsNotEmpty()
  @IsNumber()
  increment!: number;
}
