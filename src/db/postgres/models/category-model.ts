import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Сategory {
  @PrimaryColumn()
  id!: number;

  @Column()
  displayName!: string;

  @Column()
  createdAt!: Date;
}
