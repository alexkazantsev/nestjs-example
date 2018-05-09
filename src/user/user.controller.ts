import { Get, Controller, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { User } from './user.entity';
import { UserService } from './user.service';

@ApiUseTags('user')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  async fetchAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(): Promise<boolean> {
    return true;
  }
}
