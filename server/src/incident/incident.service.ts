import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncidentDto } from './dto/incident.dto';
import { IncidentRepository } from './incident.repository';
import { Incident } from './entities/incident.entity';
import { Position } from 'src/tag/dto/position.dto';
@Injectable()
export class IncidentService {
  constructor(private _incidentRepository: IncidentRepository) {}

  async getAll(): Promise<Incident[]> {
    return await this._incidentRepository.getIncidents();
  }

  async getOne(id: number): Promise<Incident> {
    const incident = await this._incidentRepository.getIncident(id);
    if (!incident) throw new NotFoundException('incedent not found ');
    return incident;
  }

  async createIncident(createIncidentDto: CreateIncidentDto): Promise<number> {
    return await this._incidentRepository.createIncident(createIncidentDto);
  }

  async getIncidentForDate(date: string): Promise<Incident[]> {
    return await this._incidentRepository.getIncidentForDate(date);
  }

  async getIncidentsInMonth(month: string): Promise<Incident[]> {
    return await this._incidentRepository.getIncidentsInMonth(month);
  }

  async updateReport(id: number, updatedReport: string) {
    const report = await this._incidentRepository.updateReport(
      id,
      updatedReport,
    );
    if (!report) {
      throw new NotFoundException('incedent not found ');
    }
  }

  async getIncidentPositions(id: number): Promise<Position[]> {
    return await this._incidentRepository.getIncidentPositions(id);
  }
}
