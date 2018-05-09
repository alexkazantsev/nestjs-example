import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Get('token')
  async createToken(): Promise<any> {
    return await this.authService.createToken();
  }
}
