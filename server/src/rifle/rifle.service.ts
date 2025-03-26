import { Injectable, NotFoundException } from '@nestjs/common';
import { Rifle } from './entities/rifle.entity';
import { RifleRepository } from './rifle.repository';

@Injectable()
export class RifleService {
  constructor(private _rifleRepository: RifleRepository) {}

  async create(rifle: Rifle): Promise<Rifle> {
    return await this._rifleRepository.createRifle(rifle);
  }

  async findAll(): Promise<Rifle[]> {
    return await this._rifleRepository.findAll();
  }

  async findOne(id: number): Promise<Rifle> {
    const rifle = await this._rifleRepository.findOne(id);
    if (!rifle) {
      throw new NotFoundException(`Rifle with ID ${id} does not exist`);
    }
    return rifle;
  }

  async remove(id: number): Promise<void> {
    return await this._rifleRepository.remove(id);
  }
  async updateEnableRifle(id: number) {
    const rifle = await this._rifleRepository.updateEnableRifle(id);
    if (!rifle) {
      throw new NotFoundException('rifle not found ');
    }
  }
}
