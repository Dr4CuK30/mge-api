import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Transfer } from './transfer.entity';
import { Project } from './project.entity';

@Entity('organizational_units')
export class OrganizationalUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 50 })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Project, (project) => project.organizationalUnits)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToMany(() => User, (user) => user.organizationalUnits)
  users: User[];

  @OneToMany(() => Transfer, (transfer) => transfer.organizationalUnit)
  transfers: Transfer[];
}
