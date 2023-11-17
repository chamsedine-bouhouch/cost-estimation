import { CreateAnswerDto } from './create-answer.dto';

export class CreateProjectDto {
  name: string;
  email: string;
  project_category: string;
  answer: [CreateAnswerDto];
  score: number;
}
