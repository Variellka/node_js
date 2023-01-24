import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Index, OneToMany } from 'typeorm';
import { ICategoryPostgres, IProductPostgres, IRating } from '../../../types/types';
import { Category } from './category-model';
import { Rating } from './rating-model';

@Entity('product')
export class Product implements IProductPostgres {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  displayName!: string;

  @Column()
  createdAt!: Date;

  @Column({ default: 0 })
  totalRating!: number;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable()
  categories!: ICategoryPostgres[];

  @Column()
  price!: number;

  @OneToMany(() => Rating, (rating) => rating.product, {
    cascade: true,
  })
  ratings!: IRating[];
}
