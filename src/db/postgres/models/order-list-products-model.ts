import { Column, Entity, Index, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { IOrderListPostgresProducts, IProductPostgres } from '../../../types/types';
import { Product } from './product-model';

@Entity('order-list-products')
export class OrderListProducts implements IOrderListPostgresProducts {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id!: string;

  @Column()
  quantity!: number;

  @OneToOne(() => Product)
  @JoinColumn()
  product!: IProductPostgres;
}
