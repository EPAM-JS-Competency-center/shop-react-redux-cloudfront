import { Entity, Column, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @ManyToOne(() => Cart, (cart) => cart.id)
  id: string;

  @Column()
  product_id: string;

  @Column()
  count: number;
}
