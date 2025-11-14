import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';
import { BaseRepository } from 'src/commons/base-repository';

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(private readonly dataSource: DataSource) {
    super(Product, dataSource);
  }
}