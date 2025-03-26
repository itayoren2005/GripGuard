import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { Rifle } from 'src/rifle/entities/rifle.entity';
import { CreateIncidentDto } from './dto/incident.dto';
import * as dayjs from 'dayjs';
import { Position } from 'src/tag/dto/position.dto';
@Injectable()
export class IncidentRepository {
  constructor(
    @InjectRepository(Incident)
    private _incidentRepository: Repository<Incident>,
    @InjectRepository(Rifle)
    private readonly _rifleRepository: Repository<Rifle>,
  ) {}

  async getIncidents(): Promise<Incident[]> {
    return await this._incidentRepository.find({
      relations: ['rifles'],
    });
  }

  async getIncident(id: number): Promise<Incident | null> {
    return await this._incidentRepository.findOne({
      where: { id },
      relations: ['rifle'],
    });
  }

  async createIncident(createIncidentDto: CreateIncidentDto): Promise<number> {
    const { rifles, positions, ...incidentData } = createIncidentDto;
    const newIncident = this._incidentRepository.create({
      ...incidentData,
      positions: positions as Position[],
    });

    if (rifles && rifles.length > 0) {
      const rifleIds = rifles.map((r) => r.id);
      const rifleEntities = await this._rifleRepository.findBy({
        id: In(rifleIds),
      });
      newIncident.rifle = rifleEntities;
    }

    const savedIncident = await this._incidentRepository.save(newIncident);
    if (!savedIncident)
      throw new Error('Error occurred while saving the incident');
    return savedIncident.id;
  }

  async getIncidentForDate(date: string): Promise<Incident[]> {
    const incidents: Incident[] = await this._incidentRepository.find();
    const filteredIncidents = incidents.filter((incident) => {
      const incidentDate = incident.time.split(' ')[0]; // Assumes 'time' is stored in 'YYYY-MM-DD HH:mm:ss' format
      return incidentDate === date;
    });
    filteredIncidents.sort((firstIncident, secondIncident) => {
      return (
        new Date(firstIncident.time).getTime() -
        new Date(secondIncident.time).getTime()
      );
    });

    return filteredIncidents;
  }
  async getIncidentsInMonth(month: string): Promise<Incident[]> {
    const startOfMonth = dayjs(`${month}-01`)
      .startOf('month')
      .format('YYYY-MM-DD HH:mm:ss');
    const endOfMonth = dayjs(`${month}-01`)
      .endOf('month')
      .format('YYYY-MM-DD HH:mm:ss');

    const incidents: Incident[] = await this._incidentRepository
      .createQueryBuilder('incident')
      .where('incident.time BETWEEN :startOfMonth AND :endOfMonth', {
        startOfMonth,
        endOfMonth,
      })
      .getMany();

    return incidents;
  }
  async updateReport(
    id: number,
    updatedReport: string,
  ): Promise<null | Incident> {
    const incedent = await this.getIncident(id);
    if (incedent) {
      incedent.report = updatedReport;
      return await this._incidentRepository.save(incedent);
    } else return null;
  }

  async getIncidentPositions(id: number): Promise<Position[]> {
    const incident = await this.getIncident(id);
    if (incident) return incident.positions;
  }
}
