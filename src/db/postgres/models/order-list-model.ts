import { JoinTable, Entity, Index, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToMany } from 'typeorm';
import { IAccount, IOrderListPostgres, IOrderListPostgresProducts } from '../../../types/types';
import { Account } from './account-model';
import { OrderListProducts } from './order-list-products-model';

@Entity('order-list')
export class OrderList implements IOrderListPostgres {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id!: string;

  @OneToOne(() => Account)
  @JoinColumn()
  user!: IAccount;

  @ManyToMany(() => OrderListProducts, (orderListProducts) => orderListProducts, {
    cascade: true,
  })
  @JoinTable()
  products!: IOrderListPostgresProducts[];
}
