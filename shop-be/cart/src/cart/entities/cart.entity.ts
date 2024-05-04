import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: false })
  created_ad: Date;

  @Column({ nullable: false })
  updated_at: Date;

  @Column({ default: 'OPEN' })
  status: string;
}
