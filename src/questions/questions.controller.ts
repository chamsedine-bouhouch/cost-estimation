import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { Question } from './models/question.model';
import { ProjectTypeEnum } from 'src/core/enums/projectTypeEnum';
import { ApiQuery } from '@nestjs/swagger';

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

  @Get('/project_type')
  @ApiQuery({ name: 'project_type', enum: ProjectTypeEnum })
  getQuestionsByType(
    @Query('project_type') project_type: ProjectTypeEnum = ProjectTypeEnum.Web,
  ) {
    return this.questionService.getQuestionsByType(project_type);
  }
}
