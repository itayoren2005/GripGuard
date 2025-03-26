import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { ZodValidationPipe } from './zod-validation.pipe';
import {
  LoginDto,
  LoginSchema,
  signUpDto,
  signUpSchema,
} from './dto/inputUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { UpdateRoleDto } from './dto/role.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from './entities/user.entity';
import { RoleGuard } from 'src/auth/roles/role.guard';

@Controller('user')
export class UserController {
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
  ) {}

  @Post('signup')
  async create(
    @Body(new ZodValidationPipe(signUpSchema)) signUpDto: signUpDto,
  ) {
    const user = await this._userService.signUp(signUpDto);
    return this._authService.addPayload(user);
  }

  @Post('login')
  async login(@Body(new ZodValidationPipe(LoginSchema)) loginDto: LoginDto) {
    const user = await this._userService.logIn(loginDto);
    return this._authService.addPayload(user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this._userService.findAll();
  }
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch('/update-role/:username')
  updateReport(
    @Param('username') username: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const { role } = updateRoleDto;
    const user = this._userService.updateRole(username, role);
    return user;
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Delete(':username')
  remove(@Param('username') username: string) {
    return this._userService.remove(username);
  }
}
