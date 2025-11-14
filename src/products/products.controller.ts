import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginationModel } from 'src/commons/pagination.model';
import { ProductQueryDto, ReportQueryDto } from './dto/product.query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

 
  @ApiOperation({ summary: 'Get all products' })
  @Get()
  findAll(@Query() queries: ProductQueryDto) {
    return this.productsService.findAll(queries);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }

  @ApiOperation({ summary: 'Get deleted products report' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('report/deleted-products')
  getDeletedProductsReport() {
    return this.productsService.getDeletedProductsReport();
  }

  @ApiOperation({ summary: 'Get no deleted products report' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('report/no-deleted-products')
  getNoDeletedProductsReport(@Query() queries: ReportQueryDto) {
    return this.productsService.getNoDeletedProductsReport(queries);
  }

  @ApiOperation({ summary: 'Get products by category' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('report/products-by-category')
  getProductsByCategory() {
    return this.productsService.getProductsByCategory();
  }

}
