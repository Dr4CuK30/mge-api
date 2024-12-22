import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationalUnit } from './organizational-unit.entity';
import { User } from '../../user/entities/user.entity';
import { Transfer } from './transfer.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false, nullable: false, length: 50 })
  name: string;

  @Column({ unique: false, nullable: true, length: 500 })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => User, (user) => user.projects)
  users: User[];

  @OneToMany(
    () => OrganizationalUnit,
    (organizationalUnit) => organizationalUnit.project,
  )
  organizationalUnits: OrganizationalUnit[];

  @OneToMany(() => Transfer, (transfer) => transfer.project)
  transfers: Transfer[];
}
