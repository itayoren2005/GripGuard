import { IsEnum, IsString } from 'class-validator';
import { Role } from '../entities/user.entity';

export class UserDto {
  @IsString()
  username: string;

  @IsEnum(Role, {
    message:
      'role must be one of the following values: admin, observer, investigator',
  })
  role: Role;
}
