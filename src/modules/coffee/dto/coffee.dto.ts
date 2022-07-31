import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CoffeeDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  status: boolean;

  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @Type(() => Date)
  @IsDate()
  updatedAt: Date;
}
