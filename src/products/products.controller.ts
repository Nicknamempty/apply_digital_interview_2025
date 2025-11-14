import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginationModel } from 'src/commons/pagination.model';
import { ProductQueryDto, ReportQueryDto } from './dto/product.query.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

 
  @Get()
  findAll(@Query() queries: ProductQueryDto) {
    return this.productsService.findAll(queries);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }


  @Get('report/deleted-products')
  getDeletedProductsReport() {
    return this.productsService.getDeletedProductsReport();
  }

  @Get('report/no-deleted-products')
  getNoDeletedProductsReport(@Query() queries: ReportQueryDto) {
    return this.productsService.getNoDeletedProductsReport(queries);
  }

  @Get('report/products-by-category')
  getProductsByCategory() {
    return this.productsService.getProductsByCategory();
  }

}
