import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rifle } from 'src/rifle/entities/rifle.entity';

@Injectable()
export class RifleRepository {
  constructor(
    @InjectRepository(Rifle)
    private _rifleRepository: Repository<Rifle>,
  ) {}

  async createRifle(rifle: Rifle): Promise<Rifle> {
    const aliasExists = await this.findAlias(rifle.alias);
    if (aliasExists)
      throw new ConflictException(`this alias is already in use`);
    return await this._rifleRepository.save(rifle);
  }

  async findAll(): Promise<Rifle[]> {
    return await this._rifleRepository.find({
      relations: ['incident'],
    });
  }

  async findOne(id: number): Promise<Rifle | null> {
    return await this._rifleRepository.findOne({
      where: { id },
      relations: ['incident'],
    });
  }

  async findAlias(alias: string): Promise<Rifle | null> {
    return await this._rifleRepository.findOne({
      where: { alias },
      relations: ['incident'],
    });
  }

  async remove(id: number): Promise<void> {
    const rifle = await this._rifleRepository.findOne({ where: { id } });
    if (!rifle) {
      throw new NotFoundException(`Rifle with ID ${id} does not exist`);
    }
    await this._rifleRepository.delete(id);
  }

  async updateEnableRifle(id: number): Promise<null | Rifle> {
    const rifle = await this.findOne(id);
    if (rifle) {
      rifle.enable = !rifle.enable;
      return await this._rifleRepository.save(rifle);
    } else return null;
  }
}
