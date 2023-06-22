import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './database/entites/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'projetovb.sqlite',
      entities: [Product],
      synchronize: true, //development only
    }),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductsController],
  providers: [AppService],
})
export class AppModule {}
