import { User } from '@/auth/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Contact } from './contacts.entity';

@Entity('sites')
export class Site {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, length: 500 })
  image: string;

  @Column('text')
  address: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User, (user) => user.sites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Contact, (contact) => contact.site, { cascade: true })
  contacts: Contact[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
