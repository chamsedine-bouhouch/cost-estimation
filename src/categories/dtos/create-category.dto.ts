import { Category } from '../models/category.model';

export class CreateCategoryDto {
  name: string;
  parent: string;
  children: Category[];
}
