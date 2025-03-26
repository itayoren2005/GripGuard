import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Rifle } from 'src/rifle/entities/rifle.entity';
import { Position } from 'src/tag/dto/position.dto';

@Entity()
export class Incident {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string;

  @Column()
  report: string;

  @Column('jsonb', { nullable: true })
  positions: Position[];

  @ManyToMany(() => Rifle, (rifle) => rifle.incident)
  @JoinTable()
  rifle: Rifle[];
}
