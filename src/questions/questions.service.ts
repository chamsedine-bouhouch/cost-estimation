import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './models/question.model';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { projectTypeEnum } from 'src/core/enums/projectTypeEnum';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
  ) {}

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const createdQuestion = new this.questionModel(createQuestionDto);
    return createdQuestion.save();
  }

  async getQuestion(questionId): Promise<Question> {
    return await this.questionModel.findById(questionId);
  }

  async getQuestionsByType(projectType: projectTypeEnum): Promise<Question[]> {
    // Use the promise-based approach to find questions by type
    const questions = await this.questionModel.find({
      project_type: projectType,
    });
    return questions;
  }

  async getQuestionsByIds(questionIds: string[]): Promise<Question[]> {
    // Assuming your Question model is used here
    const questions = await this.questionModel
      .find({ _id: { $in: questionIds } })
      .exec();
    return questions;
  }
}
