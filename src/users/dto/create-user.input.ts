import { IsEmail, IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
