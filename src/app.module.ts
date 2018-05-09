import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ORM_COFIG } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORM_COFIG),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class ApplicationModule { }
