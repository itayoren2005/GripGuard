import { Incident } from 'src/incident/entities/incident.entity';
import { ManyToMany, OneToMany, PrimaryColumn, Entity, Column } from 'typeorm';

@Entity()
export class Rifle {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  alias: string;

  @Column()
  enable: boolean;

  @ManyToMany(() => Incident, (incident) => incident.rifle)
  incident: Incident[];
}
