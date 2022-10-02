import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn()
  id!: number;

  @Column()
  displayName!: string;

  @Column()
  createdAt!: Date;

  @Column()
  totalRating!: number;

  @Column()
  categoryId!: number;

  @Column()
  price!: number;
}
