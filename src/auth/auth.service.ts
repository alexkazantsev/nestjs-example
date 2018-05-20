import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JWT_SECRET, JWT_EXPIRES } from '../config';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
  ) {}

  async createToken(email: string, id: number) {
    const token = jwt.sign({ email, id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return {
      expires_in: JWT_EXPIRES,
      access_token: token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return this.userService.findById(payload.id);
  }
}
