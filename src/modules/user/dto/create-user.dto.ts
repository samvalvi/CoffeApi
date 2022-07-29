import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(5, { message: 'Name must be at least 5 characters long' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({ message: 'Email is not valid' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
