import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let productsController: ProductsController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [AppService],
    }).compile();

    // quando for estático
    // appService = await app.resolve(AppService);

    appService = moduleRef.get<AppService>(AppService);
    productsController = moduleRef.get<ProductsController>(ProductsController);
  });

  describe('Products', () => {
    it('should return an array of Products', () => {
      // mock de products
      const result = [
        {
          name: 'Produto',
          code: 1231241,
          quantity: 234,
        },
      ];
      jest.spyOn(appService, 'getProducts').mockImplementation(() => result);

      // TODO: Fix this
      //productsController.getProducts();
      expect(appService.getProducts).toHaveBeenCalled();
    });
  });
});
