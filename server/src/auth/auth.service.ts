import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private _jwtService: JwtService) {}
  async addPayload(user: UserDto) {
    const payload = {
      username: user.username,
      role: user.role,
    };
    return {
      access_token: this._jwtService.sign(payload),
      role: user.role,
    };
  }
}
