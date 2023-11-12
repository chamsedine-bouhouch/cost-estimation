export class CreateProjectDto {
  name: string;
  email: string;
  answer: [CreateAnswerDto];
  score: number;
}

export class CreateAnswerDto {
  question_id: string;
  answer: string;
}
