import { IsBoolean, IsDate, IsIn, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { PaginationModel } from "src/commons/pagination.model";
import { ApiProperty } from "@nestjs/swagger";

export class ProductQueryDto extends PaginationModel{
    @ApiProperty({ description: 'Minimum price range', example: 100, required: false })
    @IsOptional()
    @IsNumber()
    minPrice?: number;

    @ApiProperty({ description: 'Maximum price range', example: 1000, required: false })
    @IsOptional()
    @IsNumber()
    maxPrice?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'filter by category', example: 'Electronics', required: false })
    category?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'filter by name', example: 'iPhone', required: false })
    name?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'filter by color', example: 'Red', required: false })
    color?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'filter by brand', example: 'Apple', required: false })
    brand?:string;

    @IsOptional()

    @IsInt()
    @ApiProperty({ description: 'Minimum stock range', example: 10, required: false })
    minStock?: number;

    @IsOptional()
    @IsInt()
    @ApiProperty({ description: 'Maximum stock range', example: 100, required: false })
    maxStock?: number;

}


export class ReportQueryDto {
    @IsOptional()
    @IsDate()
    from?: Date;

    @IsOptional()
    @IsDate()
    to?: Date;

    @IsOptional()
    @IsString()
    @IsIn(['Y', 'N', 'ALL'])
    withPrice?: 'Y' | 'N' | 'ALL' = 'ALL';
}