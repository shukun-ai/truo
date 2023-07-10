import { TaskSchema } from '@shukun/schema';
import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';

export class TaskCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly taskName!: string;

  // TODO validate connector type here.
  @IsNotEmpty()
  readonly task!: TaskSchema;
}

export class TaskRemoveDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly taskName!: string;
}
