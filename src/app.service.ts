import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './database/entites/product.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async addProduct(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }
}
