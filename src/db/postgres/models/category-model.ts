import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, Index, JoinTable } from 'typeorm';
import { Product } from './product-model';

@Entity('category')
export class Category {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable()
  products: Product[];

  @Column()
  displayName!: string;

  @Column()
  createdAt!: Date;
}
