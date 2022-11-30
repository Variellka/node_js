import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, Index, JoinTable } from 'typeorm';
import { ICategoryPostgres, IProductPostgres } from '../../../types/types';
import { Product } from './product-model';

@Entity('category')
export class Category implements ICategoryPostgres {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable()
  products: IProductPostgres[];

  @Column()
  displayName!: string;

  @Column()
  createdAt!: Date;
}
