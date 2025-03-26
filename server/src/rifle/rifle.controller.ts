import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { RifleService } from './rifle.service';
import { Rifle } from './entities/rifle.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/user/entities/user.entity';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/roles/role.guard';

@Controller('rifle')
export class RifleController {
  constructor(private _rifleService: RifleService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post()
  async create(@Body() rifle: Rifle): Promise<Rifle> {
    return await this._rifleService.create(rifle);
  }

  @Roles(Role.ADMIN, Role.INVESTIGATOR, Role.OBSERVER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get()
  async findAll() {
    return await this._rifleService.findAll();
  }

  @Roles(Role.ADMIN, Role.INVESTIGATOR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Rifle> {
    return await this._rifleService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch('/update-enable/:id')
  updateEnableRifle(@Param('id') id: number) {
    return this._rifleService.updateEnableRifle(id);
  }
}
