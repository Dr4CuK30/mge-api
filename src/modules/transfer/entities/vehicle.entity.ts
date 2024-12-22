import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transfer } from './transfer.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 7 })
  plate: string;

  @Column({ unique: true, nullable: false, length: 50 })
  service: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.transfers)
  transfers: Transfer[];
}
