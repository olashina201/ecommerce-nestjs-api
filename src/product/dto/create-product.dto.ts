import { OmitType } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Product } from '../entities/product.entity';

/** Describes the fields needed to create a Product */
export class CreateProductDto extends OmitType(Product, [
  'id',
  'createdAt',
] as const) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  basePrice: string | number | Decimal;

  @IsNumber()
  @IsOptional()
  discountPercentage?: number;

  @IsInt()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsArray()
  categories?: string[];
}
