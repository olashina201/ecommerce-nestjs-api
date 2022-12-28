import { Prisma } from '@prisma/client';

/** Describes the properties of a Product in the database */
export class Product implements Prisma.ProductUncheckedCreateInput {
  id?: string;
  name: string;
  picture?: string;
  basePrice: string | number | Prisma.Decimal;
  discountPercentage?: number;
  stock?: number;
  description?: string;
  createdAt?: string | Date;
}
