import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { TokenResponse, AuthServiceInterface } from './interfaces/auth.service.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  async createToken(): Promise<TokenResponse> {
    const expiresIn = 60 * 60, secretOrKey = 'secret';
    const user = { email: 'thisis@example.com' };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<{}> {
    // put some validation logic here
    // for example query user by id / email / username
    return {};
  }
}
