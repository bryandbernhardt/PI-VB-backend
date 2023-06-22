import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  @IsNotEmpty({
    message: 'O código do produto deve ser declarado!',
  })
  @IsNumber(
    {
      maxDecimalPlaces: 0,
    },
    {
      message: 'O código não deve conter casas decimais e ser um número.',
    },
  )
  code: number;

  @Column()
  @IsNotEmpty({
    message: 'O nome do produto deve ser declarado!',
  })
  @IsString({
    message: 'O nome do produto deve ser um texto!',
  })
  name: string;

  @Column()
  @IsNotEmpty({
    message: 'A quantidade do produto deve ser declarado!',
  })
  @IsNumber(
    {
      maxDecimalPlaces: 0,
    },
    {
      message: 'A quantidade não deve conter casas decimais e ser um número.',
    },
  )
  quantity: number;

  @Column('double')
  @IsNotEmpty({
    message: 'O valor do produto deve ser declarado!',
  })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: 'O valor deve ser um número e conter até 2 casas decimais.',
    },
  )
  value: number;
}
