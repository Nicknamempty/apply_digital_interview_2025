import { IsInt, IsOptional } from "class-validator";

export class PaginationModel {

    @IsOptional()
    @IsInt()
    page: number;
  
    @IsOptional()
    @IsInt()
    limit: number;
  
    totalPages: number;
  
    totalItems: number;
  
    nextPage?: number;
  
    previousPage?: number;
  }
  