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

config({
  path: join(
    ROOT_DIR,
    process.env.NODE_ENV === 'production' ? './.env.production' : './.env',
  ),
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Use DATABASE_URL from Render
      entities: [Incident, User, Rifle],
      synchronize: true, // Set to false in production if using migrations
      ssl: {
        rejectUnauthorized: false, // Required for Render's managed PostgreSQL
      },
    }),
    UserModule,
    IncidentModule,
    RifleModule,
    AuthModule,
    TagModule,
  ],
})
export class AppModule {}
