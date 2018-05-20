import { Get, Controller, Post, UseGuards, Body, Param, Delete, Put, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiUseTags('user')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: 'Get all users' })
  async fetchAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ title: 'Create / register a new user' })
  async create(@Body() userDto: CreateUserDto): Promise<User> {
    const user = this.userService.findByEmail(userDto.email);
    if (user) throw new HttpException('User with this email already registered', HttpStatus.BAD_REQUEST);
    return this.userService.create(userDto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: 'Update an existing user' })
  async update(@Body() userDto: UpdateUserDto, @Param('id') userId: number): Promise<User> {
    const user = this.userService.findById(userId);
    if (!user) throw new HttpException('Can\'t find user with this id', HttpStatus.BAD_REQUEST);
    return this.userService.update(userDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: 'Delete user' })
  async remove(@Param('id') userId: number): Promise<any> {
    return this.userService.remove(userId);
  }
}
