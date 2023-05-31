import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';
import { ProductsController } from './../src/app.controller';

describe('AppController (e2e)', () => {
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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ProductsController],
      providers: [AppService],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(appService.getProducts());
  });
});
