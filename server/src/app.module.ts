import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ROOT_DIR } from './Constant';
import { config } from 'dotenv';
import { join } from 'node:path';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { IncidentModule } from './incident/incident.module';
import { RifleModule } from './rifle/rifle.module';
import { Rifle } from './rifle/entities/rifle.entity';
import { Incident } from './incident/entities/incident.entity';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';

config({ path: join(ROOT_DIR, './.env') });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Incident, User, Rifle],
      synchronize: true,
    }),
    UserModule,
    IncidentModule,
    RifleModule,
    AuthModule,
    TagModule,
  ],
})
export class AppModule {}
