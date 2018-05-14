import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { CoreModule } from '../core/core.module';

@Module({
  providers: [AuthService, JwtStrategy],
  exports: [],
  imports: [UserModule, CoreModule],
  controllers: [AuthController],
})
export class AuthModule { }
