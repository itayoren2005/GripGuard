import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/incident.dto';
import { Incident } from './entities/incident.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/user/entities/user.entity';
import { RoleGuard } from 'src/auth/roles/role.guard';
import { Position } from 'src/tag/dto/position.dto';

@Controller('incidents')
export class IncidentController {
  constructor(private readonly _incidentService: IncidentService) {}

  @Post()
  async create(@Body() createIncidentDto: CreateIncidentDto): Promise<number> {
    return await this._incidentService.createIncident(createIncidentDto);
  }

  @Roles(Role.ADMIN, Role.INVESTIGATOR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get()
  async findAll(): Promise<Incident[]> {
    return await this._incidentService.getAll();
  }

  @Roles(Role.ADMIN, Role.INVESTIGATOR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Incident> {
    return await this._incidentService.getOne(+id);
  }

  @Roles(Role.ADMIN, Role.INVESTIGATOR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('date/:date')
  async getIncidentsByDate(@Param('date') date: string): Promise<Incident[]> {
    return await this._incidentService.getIncidentForDate(date);
  }

  @Roles(Role.ADMIN, Role.INVESTIGATOR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('month/:month')
  async getIncidentsInMonth(@Param('month') date: string): Promise<Incident[]> {
    return await this._incidentService.getIncidentsInMonth(date);
  }

  @Roles(Role.ADMIN, Role.INVESTIGATOR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch('/update-report/:id')
  updateReport(@Param('id') id: string, @Body() body: { report: string }) {
    return this._incidentService.updateReport(+id, body.report);
  }

  @Roles(Role.ADMIN, Role.INVESTIGATOR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('positions/:id')
  async getIncidentPositions(@Param('id') id: number): Promise<Position[]> {
    return await this._incidentService.getIncidentPositions(id);
  }
}
