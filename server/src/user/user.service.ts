import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Role, User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto, signUpDto } from './dto/inputUser.dto';

@Injectable()
export class UserService {
  constructor(private _userRepository: UserRepository) {}

  async logIn(userInput: LoginDto): Promise<UserDto> {
    const user = await this._userRepository.findOneByUsername(
      userInput.username,
    );
    if (user && (await bcrypt.compare(userInput.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async signUp(userInput: signUpDto): Promise<UserDto> {
    const existingUser = await this._userRepository.findOneByUsername(
      userInput.username,
    );
    if (existingUser)
      throw new ConflictException(`User ${userInput.username} already exists`);

    const allowedRoles =
      userInput.role === Role.INVESTIGATOR || userInput.role === Role.OBSERVER;

    if (!allowedRoles) {
      throw new UnauthorizedException('Unauthorized role');
    }
    return this.create(userInput);
  }

  async create(userInput: signUpDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    const user = new User();
    user.username = userInput.username;
    user.password = hashedPassword;
    user.role = userInput.role;
    return this._userRepository.saveUser(user);
  }

  async findAll(): Promise<UserDto[]> {
    return await this._userRepository.getUsers();
  }
  async updateRole(username: string, updatedRole: Role) {
    const role = await this._userRepository.updateRole(username, updatedRole);
    if (!role) {
      throw new NotFoundException('username not found ');
    }
  }

  async remove(username: string): Promise<void> {
    return await this._userRepository.remove(username);
  }
}
