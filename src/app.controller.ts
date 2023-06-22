import { Controller, Get, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { Product } from './database/entites/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProducts() {
    try {
      return this.appService.getProducts();
    } catch (error) {
      return error;
    }
  }

  @Post()
  createProduct(@Res() res: Response, @Body() product: Product) {
    try {
      this.appService.addProduct(product);
      return res.status(HttpStatus.CREATED).json(product);
    } catch (error) {
      return error;
    }
  }
}
