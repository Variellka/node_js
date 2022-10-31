import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product-model';
@Entity()
export class Сategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Product, (product) => product.displayName)
  prodictId: Product[];

  @Column()
  displayName!: string;

  @Column()
  createdAt!: Date;
}
