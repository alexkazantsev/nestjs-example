import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from '../core/password.service';

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

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async getPasswordByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .select('user.password')
      .addSelect('user.id')
      .where({ email })
      .getOne();
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const password = await this.passwordService.generatePassword(userDto.password);
    const user = new User({ ...userDto, password });
    return this.userRepository.save(user);
  }
}
