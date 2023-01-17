import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { IOrderListPostgresProducts, IProductPostgres } from '../../../types/types';
import { Product } from './product-model';

@Entity('order-list-products')
export class OrderListProducts implements IOrderListPostgresProducts {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id!: string;

  @Column()
  quantity!: number;

  @ManyToOne(() => Product, (product) => product)
  product!: IProductPostgres;
}
