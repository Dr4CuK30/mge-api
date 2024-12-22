import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationalUnit } from '../../transfer/entities/organizational-unit.entity';
import { Transfer } from '../../transfer/entities/transfer.entity';
import { Project } from '../../transfer/entities/project.entity';
import { Role } from '../../auth/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 50 })
  username: string;

  @Column({ unique: true, nullable: false, length: 256 })
  email: string;

  @Column({ nullable: false, name: 'password_hash' })
  passwordHash: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable({ name: 'user_projects' })
  projects: Project[];

  @ManyToMany(
    () => OrganizationalUnit,
    (organizationalUnit) => organizationalUnit.users,
  )
  @JoinTable({ name: 'user_organizational_units' })
  organizationalUnits: OrganizationalUnit[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToMany(() => Transfer, (transfer) => transfer.client)
  clientTransfers: Transfer[];

  @OneToMany(() => Transfer, (transfer) => transfer.transmitter)
  transmitterTransfers: Transfer[];
}
