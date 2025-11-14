import { Cron, CronExpression } from "@nestjs/schedule";
import { Injectable } from "@nestjs/common";
import { CDN_FULL_URL } from "src/commons/constants";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { CDNResponseDto } from "./dto/product.dto";
import { ProductsService } from "./products.service";

@Injectable()
export class ProductsCronjob {
  constructor(private readonly httpService: HttpService, private readonly productsService: ProductsService) {}


  @Cron(CronExpression.EVERY_HOUR)
   async addProduct() {
    try {
    console.log('Add product cronjob');
    console.log(CDN_FULL_URL);
    // cdn credentials not working, uncomment when credentials are working
    //const response: CDNResponseDto = (await firstValueFrom(this.httpService.get(CDN_FULL_URL))).data;
    const productMock: CDNResponseDto= 
      {
        items: [
          {
            fields: {
              sku: Math.random().toString(36).substring(2, 15),
              name: 'Product 1',
              brand: 'Brand 1',
              model: 'Model 1',
              category: 'Category 1',
              color: 'Color 1',
              price: 100,
              currency: 'USD',
              stock: 100,
            }
          }
        ]
      }
    
    await this.productsService.bulkCreate(productMock.items);
    }
    catch (error) {
      console.log(error);
    }
  }
}
