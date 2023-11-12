import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Get('/:type')
  @ApiQuery({ name: 'type', enum: projectTypeEnum })
  getQuestionByType(
    @Query('type') type: projectTypeEnum = projectTypeEnum.Web,
  ) {
    return this.questionService.getQuestionsByType(type);
  }
}
