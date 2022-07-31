import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly status: boolean;

  @Type(() => Date)
  @IsDate()
  readonly createdAt: Date;
}
