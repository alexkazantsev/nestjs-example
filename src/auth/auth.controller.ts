import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { PasswordService } from '../core/password.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) { }

  @Post('login')
  async login(@Body() { email, password }: LoginDto): Promise<any> {
    const user = await this.userService.getPasswordByEmail(email);
    console.log(user);
    if (!user) throw new HttpException('User was not found', HttpStatus.NOT_FOUND);

    const isValid = await this.passwordService.comparePassword(password, user.password);
    if (!isValid) throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);

    return this.authService.createToken(email, user.id);
  }

  @Post('register')
  async register(@Body() registerDto): Promise<any> {
    return false;
  }
}
