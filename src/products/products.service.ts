import { Injectable } from '@nestjs/common';


@Injectable()
export class ProductsService {


  findAll() {
    return `This action returns all products`;
  }



  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
