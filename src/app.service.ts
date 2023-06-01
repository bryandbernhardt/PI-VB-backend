import { Injectable } from '@nestjs/common';
import { ProductDto } from './model/ProductDto';

@Injectable()
export class AppService {
  getProducts(): Array<ProductDto> {
    return [
      {
        name: 'Produto 1',
        code: 1241241,
        quantity: 15,
        value: 16.9,
      },
      {
        name: 'Produto 2',
        code: 34563456,
        quantity: 20,
        value: 15.95,
      },
      {
        name: 'Produto 3',
        code: 56785678,
        quantity: 7,
        value: 4.0,
      },
    ];
  }
}
