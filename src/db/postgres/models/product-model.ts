import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Index } from 'typeorm';
import { ICategoryPostgres, IProductPostgres } from '../../../types/types';
import { Category } from './category-model';

@Entity('product')
export class Product implements IProductPostgres {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  displayName!: string;

  @Column()
  createdAt!: Date;

  @Column()
  totalRating!: number;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable()
  categories!: ICategoryPostgres[];

  @Column()
  price!: number;
}
