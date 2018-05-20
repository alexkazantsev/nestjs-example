import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { CoreModule } from '../core/core.module';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [UserModule, CoreModule],
  controllers: [AuthController],
})
export class AuthModule { }
