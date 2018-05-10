import { Get, Controller, Post, UseGuards, Body, Param, Delete, Put, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';

import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiUseTags('user')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  async fetchAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() user: CreateUserDto): Promise<boolean> {
    return true;
  }

  @Put('/:id')
  async update(@Body() user: UpdateUserDto, @Param('id') userId: number): Promise<any> {
    return true;
  }

  @Delete('/:id')
  @HttpCode(204)
  async remove(@Param('id') userId: number): Promise<any> {
    return true;
  }
}
