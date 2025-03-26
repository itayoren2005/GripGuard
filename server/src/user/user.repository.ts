import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async saveUser(user: User): Promise<UserDto> {
    const newUser = await this._userRepository.save(user);
    return await this.toUserDto(newUser);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this._userRepository.findOne({ where: { username } });
  }

  private toUserDto(user: User): UserDto {
    const { username, role } = user;
    return { username, role };
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this._userRepository.find();
    const filterUsers = users.map((user) => ({
      username: user.username,
      role: user.role,
    }));
    return filterUsers;
  }
  async updateRole(
    username: string,
    updatedRole: Role,
  ): Promise<null | UserDto> {
    const user = await this.findOneByUsername(username);
    if (!user) return null;
    user.role = updatedRole;
    return await this._userRepository.save(user);
  }

  async remove(username: string): Promise<void> {
    const user = await this._userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    await this._userRepository.delete(username);
  }
}
