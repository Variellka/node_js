import { Column, Entity, Index, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { IOrderList, IOrderListPostgres, IOrderListPostgresProducts, IProductPostgres } from '../../../types/types';
import { OrderList } from './order-list-model';
import { Product } from './product-model';

@Entity('order-list-products')
export class OrderListProducts implements IOrderListPostgresProducts {
  @PrimaryGeneratedColumn()
  _id!: string;

  @Column()
  quantity!: number;

  @ManyToOne(() => Product)
  product!: IProductPostgres;

  @ManyToOne(() => OrderList, (orderList) => orderList.products, {
    onDelete: 'CASCADE',
  })
  order!: IOrderListPostgres;
}
