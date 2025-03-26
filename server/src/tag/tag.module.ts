import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagGateway } from './gateway';
import { IncidentModule } from 'src/incident/incident.module';
import { RifleModule } from 'src/rifle/rifle.module';

@Module({
  imports: [IncidentModule, RifleModule],
  controllers: [TagController],
  providers: [TagService, TagGateway],
})
export class TagModule {}
