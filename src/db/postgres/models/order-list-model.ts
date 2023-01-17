import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IAccount, IOrderListPostgres, IOrderListPostgresProducts } from '../../../types/types';
import { Account } from './account-model';
import { OrderListProducts } from './order-list-products-model';

@Entity('order-list')
export class OrderList implements IOrderListPostgres {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id!: string;

  @OneToOne(() => Account, (account) => account)
  user!: IAccount;

  @OneToMany(() => OrderListProducts, (orderListProducts) => orderListProducts)
  products!: IOrderListPostgresProducts[];
}
