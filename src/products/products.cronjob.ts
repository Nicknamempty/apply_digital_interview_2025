import { Cron, CronExpression } from "@nestjs/schedule";
import { Injectable } from "@nestjs/common";
import { CDN_FULL_URL } from "src/commons/constants";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { CDNResponseDto } from "./dto/product.dto";

@Injectable()
export class ProductsCronjob {
  constructor(private readonly httpService: HttpService) {}


  @Cron(CronExpression.EVERY_HOUR)
   async addProduct() {
    try {
    console.log('Add product cronjob');
    const response: CDNResponseDto = (await firstValueFrom(this.httpService.get(CDN_FULL_URL))).data;

    }
    catch (error) {
      console.log(error);
    }
  }
}
