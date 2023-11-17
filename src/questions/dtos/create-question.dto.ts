import { Category } from 'src/categories/models/category.model';
export class CreateQuestionDto {
  name: string;
  project_category: Category;
  options: [string];
}
