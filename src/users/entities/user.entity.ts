import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Shift } from '../../shift/entities/shift.entity'; // ✅
import { UserRole } from '../../Enam/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: true }) 
  full_name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Shift, (shift) => shift.user)
  shifts: Shift[];
}
