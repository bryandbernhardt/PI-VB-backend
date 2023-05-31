import { Controller, Get, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ProductDto } from './model/ProductDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProducts(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.appService.getProducts());
  }

  @Post()
  createProduct(@Res() res: Response, @Body() product: ProductDto) {
    return res.status(HttpStatus.CREATED).json(product);
  }
}
