import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { Question } from './models/question.model';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}
  @Get()
  getQuestions() {
    return this.questionService.getQuestions();
  }

  @Post()
  createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionService.createQuestion(createQuestionDto);
  }

  @Get('/:id')
  getQuestion(@Param('id') id: string) {
    return this.questionService.getQuestion(id);
  }

  @Get('/project_type/:id')
  getQuestionsByType(@Param('id') projectCategory: string) {
    return this.questionService.getQuestionsByType(projectCategory);
  }
}
