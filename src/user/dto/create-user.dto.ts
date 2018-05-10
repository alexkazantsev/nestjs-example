import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString() readonly first_name: string;
  @IsString() readonly last_name: string;
  @IsEmail() readonly email: string;
  @IsString() readonly password: string;
}
