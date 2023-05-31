import { Module } from '@nestjs/common';
import { ProductsController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [AppService],
})
export class AppModule {}
