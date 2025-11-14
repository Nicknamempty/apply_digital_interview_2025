import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsCronjob } from './products.cronjob';
import { HttpModule } from '@nestjs/axios';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsCronjob, ProductsRepository],
  imports: [HttpModule, TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
