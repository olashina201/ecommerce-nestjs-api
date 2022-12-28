import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../entities/category.entity';

/** Describes the fields needed to create a Category */
export class CreateCategoryDto implements Category {
  @IsString()
  @IsNotEmpty()
  name: string;
}
