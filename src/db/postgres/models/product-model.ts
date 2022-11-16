import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Сategory } from './category-model';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  displayName!: string;

  @Column()
  createdAt!: Date;

  @Column()
  totalRating!: number;

  @ManyToMany(() => Сategory, (category) => category.products)
  categories: Сategory[];

  @Column()
  price!: number;
}
