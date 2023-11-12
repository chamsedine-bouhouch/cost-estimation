import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { Question } from './models/question.model';
import { projectTypeEnum } from 'src/core/enums/projectTypeEnum';
import { ApiQuery } from '@nestjs/swagger';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}
  @Get()
  questionsList() {
    return this.questionService.findAll();
  }

  @Post()
  createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionService.create(createQuestionDto);
  }

  @Get('/:id')
  getQuestion(@Param('id') id: string) {
    return this.questionService.getQuestion(id);
  }

  @Get('/:project_type')
  @ApiQuery({ name: 'project_type', enum: projectTypeEnum })
  getQuestionByType(
    @Query('project_type') project_type: projectTypeEnum = projectTypeEnum.Web,
  ) {
    return this.questionService.getQuestionsByType(project_type);
  }
}
