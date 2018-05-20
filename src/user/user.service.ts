import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from '../core/password.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number | string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const password = await this.passwordService.generatePassword(userDto.password);
    const user = { ...new User(), ...userDto, password };

    return this.userRepository.save(user);
  }

  async update(updateDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ id: updateDto.id }, updateDto);
    return this.userRepository.findOne({ id: updateDto.id });
  }

  async remove(id: number): Promise<any> {
    return this.userRepository.delete({ id });
  }
}
