import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsCronjob } from './products.cronjob';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsCronjob],
  imports: [HttpModule],
})
export class ProductsModule {}
