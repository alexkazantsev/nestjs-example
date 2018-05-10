import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsEmpty } from 'class-validator';

export class UpdateUserDto extends CreateUserDto {
  @IsNumber() readonly id: number;
  @IsEmpty() readonly password: undefined;
}
