import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  OBSERVER = 'observer',
  INVESTIGATOR = 'investigator',
}

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.OBSERVER,
  })
  role: Role;
}
