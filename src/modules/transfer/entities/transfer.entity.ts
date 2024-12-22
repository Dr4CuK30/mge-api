import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationalUnit } from './organizational-unit.entity';
import { User } from '../../user/entities/user.entity';
import { Vehicle } from './vehicle.entity';
import { Project } from './project.entity';

@Entity('transfers')
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false, nullable: false, length: 30 })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.transfers)
  @JoinColumn({ name: 'vehicle_id' })
  vehicles: Vehicle[];

  @ManyToOne(() => User, (user) => user.clientTransfers)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @ManyToOne(() => User, (user) => user.transmitterTransfers)
  @JoinColumn({ name: 'transmitter_id' })
  transmitter: User;

  @ManyToOne(() => Project, (project) => project.transfers)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(
    () => OrganizationalUnit,
    (organizationalUnit) => organizationalUnit.transfers,
  )
  @JoinColumn({ name: 'organizational_unit_id' })
  organizationalUnit: OrganizationalUnit;
}
