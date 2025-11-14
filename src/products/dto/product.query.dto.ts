import { IsBoolean, IsDate, IsIn, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { PaginationModel } from "src/commons/pagination.model";

export class ProductQueryDto extends PaginationModel{
    @IsOptional()

    @IsNumber()
    minPrice: number;

    @IsOptional()

    @IsNumber()
    maxPrice: number;

    @IsOptional()
    @IsString()
    category: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    color: string;

    @IsOptional()
    @IsString()
    brand:string;

    @IsOptional()

    @IsInt()
    minStock: number;

    @IsOptional()
    @IsInt()
    maxStock: number;

}


export class ReportQueryDto {
    @IsOptional()
    @IsDate()
    from: Date;

    @IsOptional()
    @IsDate()
    to: Date;

    @IsOptional()
    @IsString()
    @IsIn(['Y', 'N', 'ALL'])
    withPrice: 'Y' | 'N' | 'ALL' = 'ALL';
}