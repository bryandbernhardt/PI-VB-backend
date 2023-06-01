import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { ProductsController } from './../src/app.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const appService: AppService = {
    getProducts: () => [
      {
        name: 'Produto 1',
        code: 1241241,
        quantity: 15,
        value: 16.99,
      },
      {
        name: 'Produto 2',
        code: 34563456,
        quantity: 20,
        value: 15.6,
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
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/products (GET)', () => {
    it('should return "OK" and the products', () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(200)
        .expect(appService.getProducts());
    });
  });

  describe('/products (POST)', () => {
    it('should return "CREATED" and the product', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Name',
          code: 2342342,
          quantity: 1234,
          value: 15.95,
        })
        .expect(201);
    });

    it('null value: should return "BAD REQUEST"', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Name',
          code: 2342342,
          quantity: 1234,
        })
        .expect(400);
    });

    it('null quantity: should return "BAD REQUEST"', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Name',
          code: 2342342,
          value: 15.95,
        })
        .expect(400);
    });

    it('null code: should return "BAD REQUEST"', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Name',
          quantity: 1234,
          value: 15.95,
        })
        .expect(400);
    });

    it('null name: should return "BAD REQUEST"', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          code: 2342342,
          quantity: 1234,
          value: 15.95,
        })
        .expect(400);
    });

    it('number name: should return "BAD REQUEST"', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 55,
          code: 2342342,
          quantity: 1234,
          value: 15.95,
        })
        .expect(400);
    });

    it('code with decimals: should return "BAD REQUEST"', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Name',
          code: 2342342.5,
          quantity: 1234,
          value: 15.95,
        })
        .expect(400);
    });

    it('string code: should return "BAD REQUEST"', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Name',
          code: '2342342',
          quantity: 1234,
          value: 15.95,
        })
        .expect(400);
    });

    it('quantity with decimals: should return "BAD REQUEST"', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Name',
          code: 2342342,
          quantity: 1234.6,
          value: 15.95,
        })
        .expect(400);
    });

    it('string quantity: should return "BAD REQUEST"', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Name',
          code: 2342342,
          quantity: '1234',
          value: 15.95,
        })
        .expect(400);
    });

    it('value with +2 decimals: should return "BAD REQUEST"', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Name',
          code: 2342342,
          quantity: 1234,
          value: 15.955,
        })
        .expect(400);
    });

    it('string value: should return "BAD REQUEST"', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Name',
          code: 2342342,
          quantity: 1234,
          value: '15.95',
        })
        .expect(400);
    });
  });
});
