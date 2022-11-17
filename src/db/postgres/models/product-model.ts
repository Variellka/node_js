import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Index } from 'typeorm';
import { Category } from './category-model';

@Entity()
export class Product {
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
  categories: Category[];

  @Column()
  price!: number;
}
