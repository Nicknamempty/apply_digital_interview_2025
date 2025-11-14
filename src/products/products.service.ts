import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CDNItem } from './dto/product.dto';
import { PaginationModel } from 'src/commons/pagination.model';
import { ProductQueryDto, ReportQueryDto } from './dto/product.query.dto';
import { IsNull, Not } from 'typeorm';


@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  bulkCreate(products: CDNItem[]){

  const productsToCreate = products.map(product => {
    return {
      sku: product.fields.sku,
      name: product.fields.name,
      brand: product.fields.brand,
      model: product.fields.model,
      category: product.fields.category,
      color: product.fields.color,
      price: product.fields.price,
      currency: product.fields.currency,
      stock: product.fields.stock,

    };
  });
  return this.productsRepository.save(productsToCreate);
}


  findAll(queries: ProductQueryDto) {
  const { page, limit, minPrice, maxPrice, category, name, color, brand, minStock, maxStock } = queries;
  const query = this.productsRepository.createQueryBuilder('product');
  if (minPrice) {
    if (maxPrice && minPrice > maxPrice) {
      throw new BadRequestException('minPrice must be less than maxPrice');
    }
    query.andWhere('CAST(product.price AS DECIMAL) >= :minPrice', { minPrice: Number(minPrice) });
  }
  if (maxPrice) {
    if (minPrice && minPrice > maxPrice) {
      throw new BadRequestException('minPrice must be less than maxPrice');
    }
    query.andWhere('CAST(product.price AS DECIMAL) <= :maxPrice', { maxPrice: Number(maxPrice) });
  }
  if (category) {
    query.andWhere('product.category = :category', { category });
  }
  if (name) {
    query.andWhere('product.name ILIKE :name', { name: `%${name}%` });
  }
  if (color) {
    query.andWhere('product.color ILIKE :color', { color: `%${color}%` });
  }
  if (brand) {
    query.andWhere('product.brand ILIKE :brand', { brand: `%${brand}%` });
  }
  if (minStock) {
    if (maxStock && minStock > maxStock) {
      throw new BadRequestException('minStock must be less than maxStock');
    }
    query.andWhere('CAST(product.stock AS INTEGER) >= :minStock', { minStock: Number(minStock) });
  }
  if (maxStock) {
    if (minStock && minStock >= maxStock) {
      throw new BadRequestException('minStock must be less than maxStock');
    }
    query.andWhere('CAST(product.stock AS INTEGER) <= :maxStock', { maxStock: Number(maxStock) });
  }
    return this.productsRepository.getEntityPagination(query, page ?? 1, limit ?? 5);
  }


  async remove(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });
    console.log('product', product);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    try {
      await this.productsRepository.softDelete(product.id);
      return { message: 'Product deleted successfully' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error deleting product');
    }
  }


  async getDeletedProductsReport() {
    const productsDeleted = await this.productsRepository.count({ where: { deletedAt: Not(IsNull()) }, withDeleted: true });
    const products = await this.productsRepository.count({withDeleted: true });
    const report = {
      productsDeleted: productsDeleted,
      products: products,
      percentageDeleted: productsDeleted > 0 ? ((productsDeleted / products) * 100).toFixed(2) + '%' : '0.00%',
    }
    return report;
  }

  async getNoDeletedProductsReport(queries: ReportQueryDto) {
    const { from, to, withPrice } = queries;
    const query = this.productsRepository.createQueryBuilder('product');
    if (from) {
      if (to && from > to) {
        throw new BadRequestException('from must be less than to');
      }
      query.andWhere('product.createdAt >= :from', { from });
    }
    if (to) {
      if (from && from > to) {
        throw new BadRequestException('from must be less than to');
      }
      query.andWhere('product.createdAt <= :to', { to });
    }
    if (withPrice === 'Y') {
      query.andWhere('product.price > 0');
    }
    if (withPrice === 'N') {
      query.andWhere('product.price = 0');
    }
    const productsNoDeletedCount = await query.getCount();
    const totalProductsCount = await query.withDeleted().getCount();
    const report = {
      productsNoDeleted: productsNoDeletedCount,
      totalProducts: totalProductsCount,
      percentageNoDeleted:totalProductsCount > 0 ? ((productsNoDeletedCount / totalProductsCount) * 100).toFixed(2) + '%' : '0.00%',
    }
    return report;
  }


  async getProductsByCategory() {
    const products  = await this.productsRepository.find();
    const productsByCategory = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
   
    return productsByCategory;

  }
}
