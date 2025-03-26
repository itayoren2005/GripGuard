import { Module } from '@nestjs/common';
import { RifleService } from './rifle.service';
import { RifleController } from './rifle.controller';
import { RifleRepository } from './rifle.repository';
import { Rifle } from './entities/rifle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rifle])],
  controllers: [RifleController],
  providers: [RifleService, RifleRepository],
  exports: [RifleRepository],
})
export class RifleModule {}
