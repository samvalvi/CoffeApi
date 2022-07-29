import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsDate()
  readonly updatedAt = new Date();
}
