import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";

export class PaginationModel {

    @IsOptional()
    @IsInt()
    @ApiProperty({ description: 'Page number', example: 1, required: false })
    page?: number;
  
    @IsOptional()
    @IsInt()
    @ApiProperty({ description: 'Limit number', example: 10, required: false })
    limit?: number;
  
    totalPages?: number;
  
    totalItems?: number;
  
    nextPage?: number;
  
    previousPage?: number;
  }
  