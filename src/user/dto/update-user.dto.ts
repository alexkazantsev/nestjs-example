import { IsNumber, IsEmpty, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsNumber() readonly id: number;
  @IsString() readonly first_name: string;
  @IsString() readonly last_name: string;
  @IsEmail() readonly email: string;
  @IsEmpty() readonly password: undefined;
}
