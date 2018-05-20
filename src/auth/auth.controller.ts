import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { PasswordService } from '../core/password.service';
import { TokenResponse } from './interfaces/token-response.interface';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) { }

  @Post('login')
  @ApiOperation({ title: 'Login user' })
  async login(@Body() { email, password }: LoginDto): Promise<TokenResponse> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new HttpException('User was not found', HttpStatus.NOT_FOUND);

    const isValid = await this.passwordService.comparePassword(password, user.password);
    if (!isValid) throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);

    return this.authService.createToken(email, user.id);
  }
}
