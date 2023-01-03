import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct, IRating } from '../../../types/types';
import { Product } from './product-model';

@Entity('rating')
export class Rating implements IRating {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id: string;

  @Index('userId rating')
  @Column()
  userId: string;

  @Column()
  rating: number;

  @ManyToOne(() => Product, (product) => product.ratings)
  product: IProduct;
}
