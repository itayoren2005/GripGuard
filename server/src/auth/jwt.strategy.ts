import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ROOT_DIR } from '../Constant';
import { config } from 'dotenv';
import { join } from 'node:path';
import { Role } from 'src/user/entities/user.entity';

export type userPayload = {
  username: string;
  role: Role;
};
config({ path: join(ROOT_DIR, './.env') });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  validate(payload: userPayload) {
    return payload;
  }
}
