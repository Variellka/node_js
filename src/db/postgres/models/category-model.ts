import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Product } from './product-model';
@Entity()
export class Сategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];

  @Column()
  displayName!: string;

  @Column()
  createdAt!: Date;
}
