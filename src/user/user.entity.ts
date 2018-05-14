import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  last_name: string;

  @Index({ unique: true })
  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  constructor(createUserDto?: CreateUserDto) {
    if (createUserDto) {
      this.first_name = createUserDto.first_name;
      this.last_name = createUserDto.last_name;
      this.email = createUserDto.email;
      this.password = createUserDto.password;
    }
  }

}
