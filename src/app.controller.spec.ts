import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './app.controller';
import { AppService } from './app.service';
import { INestApplication } from '@nestjs/common';

describe('Products', () => {
  let app: INestApplication;
  const appService: AppService = {
    getProducts: () => [
      {
        name: 'Produto 1',
        code: 1241241,
        quantity: 15,
      },
      {
        name: 'Produto 2',
        code: 34563456,
        quantity: 20,
      },
    ],
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [AppService],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET products', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(appService.getProducts());
  });
});
