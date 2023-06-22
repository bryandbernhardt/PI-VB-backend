import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  code: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column('double')
  value: number;
}
