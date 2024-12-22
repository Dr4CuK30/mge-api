import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false, nullable: false, length: 50 })
  name: string;

  @Column({ unique: false, nullable: true, length: 500 })
  description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
