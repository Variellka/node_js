import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => Сategory, (category) => category.displayName)
  categoryId!: Сategory;

  @Column()
  price!: number;
}
