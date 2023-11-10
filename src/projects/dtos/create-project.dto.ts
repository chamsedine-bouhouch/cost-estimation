export class CreateProjectDto {
  name: string;
  email: string;
  answer: [CreateAnswerDto];
}

export class CreateAnswerDto {
  question_id: string;
  answer: string;
}
