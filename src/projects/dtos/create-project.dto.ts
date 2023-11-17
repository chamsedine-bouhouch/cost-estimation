import { CreateAnswerDto } from './create-answer.dto';

export class CreateProjectDto {
  name: string;
  email: string;
  answer: [CreateAnswerDto];
  score: number;
}
