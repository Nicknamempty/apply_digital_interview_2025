import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginationModel } from 'src/commons/pagination.model';
import { ProductQueryDto, ReportQueryDto } from './dto/product.query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


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

  @UseGuards(JwtAuthGuard)
  @Get('report/deleted-products')
  getDeletedProductsReport() {
    return this.productsService.getDeletedProductsReport();
  }

  @UseGuards(JwtAuthGuard)
  @Get('report/no-deleted-products')
  getNoDeletedProductsReport(@Query() queries: ReportQueryDto) {
    return this.productsService.getNoDeletedProductsReport(queries);
  }

  @UseGuards(JwtAuthGuard)
  @Get('report/products-by-category')
  getProductsByCategory() {
    return this.productsService.getProductsByCategory();
  }

}
