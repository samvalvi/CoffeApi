import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCoffeeDto {
  @IsString()
  name: string;

  @Type(() => Date)
  @IsDate()
  updatedAt = new Date();
}
