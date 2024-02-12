import { IsNotEmpty } from 'class-validator';

export class CsvDto {
  // TODO validate connector type here.
  @IsNotEmpty()
  readonly atomName!: string;
}
