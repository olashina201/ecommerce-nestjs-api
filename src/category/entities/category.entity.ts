import { Prisma } from '@prisma/client';

/** Describes the properties of a Category in the database */
export class Category implements Prisma.CategoryUncheckedCreateInput {
  id?: string;
  name: string;
  image?: string;
}
