import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IAccount, IOrderListPostgres, IProduct, IProductPostgres, IProductQuantity } from '../../../types/types';
import { Account } from './account-model';
import { Product } from './product-model';

@Entity('order-list')
export class OrderList implements IOrderListPostgres {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id!: string;

  @OneToOne(() => Account, (account) => account)
  user!: IAccount;

  @OneToMany(() => Product, (product) => product)
  products!: IProductPostgres[];

  @Column()
  productQuantity!: IProductQuantity[];
}
