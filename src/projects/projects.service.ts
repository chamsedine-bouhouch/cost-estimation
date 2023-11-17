import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './models/answer.model';
import { Project } from './models/project.model';
import { CreateProjectDto } from './dtos/create-project.dto';
import { CreateAnswerDto } from './dtos/create-answer.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
    private readonly questionService: QuestionsService,
  ) {}

  async getProjects(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async getProject(projectId: string): Promise<Project> {
    const project = await this.projectModel
      .findById<Project>(projectId)
      .populate({
        path: 'answers',
        populate: {
          path: 'question_id',
          model: 'Question', // Make sure to replace 'Question' with the actual name of your Question model
        },
      })
      .exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const score = await this.calculateWeightedScore(projectId);
    project.score = score;

    return project;
  }

  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectModel.findByIdAndUpdate(
      projectId,
      updateProjectDto,
      { new: true },
    );
  }

  async deleteProject(projectId: string): Promise<void> {
    const project = await this.projectModel.findByIdAndDelete(projectId);

    if (!project) {
      throw new NotFoundException('Project not found');
    }
  }

  // Answers Management
  async addAnswerToProject(
    projectId: string,
    answer: CreateAnswerDto,
  ): Promise<Project> {
    // Check if the question_id already exists
    const existingAnswer = await this.projectModel.findOne({
      _id: projectId,
      'answers.question_id': answer.question_id,
    });

    if (existingAnswer) {
      throw new BadRequestException('Duplicate Answer Error', {
        cause: new Error(),
        description: 'Duplicate question_id found. Answer cannot be added.',
      });
    }

    // Add the new answer if question_id is unique
    return await this.projectModel.findByIdAndUpdate(
      { _id: projectId },
      { $push: { answers: answer } },
    );
  }

  async deleteAnswerFromProject(projectId: string, questionId: string) {
    try {
      const answer = await this.getAnswer(projectId, questionId);

      const updatedProject = await this.projectModel.findByIdAndUpdate(
        { _id: projectId },
        {
          $pull: {
            answers: answer,
          },
        },
      );

      return updatedProject;
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error('Answer not found for this project');
        return null;
      } else {
        console.error('Unexpected error:', error);
        return null;
      }
    }
  }

  async getAnswer(projectId: string, questionId: string): Promise<Answer> {
    const project = await this.getProject(projectId);

    if (project.answers.length === 0) {
      throw new NotFoundException('No answers found for this project');
    }

    const answer = project.answers.find(
      (a) => a.question_id.toString() === questionId,
    );

    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    return answer;
  }

  async calculateWeightedScore(projectId: string): Promise<number> {
    const project = await this.projectModel
      .findById(projectId)
      .select('answers')
      .lean()
      .exec();
    const answerIds = project.answers.map((answer: any) => answer.question_id);
    const questions = await this.questionService.getQuestionsByIds(answerIds);

    const weightedScore = project.answers.reduce(
      (totalWeightedScore: number, answer: any) => {
        const questionWeight = questions.find(
          (question: any) =>
            question._id.toString() === answer.question_id.toString(),
        ).weight;

        totalWeightedScore += questionWeight * answer.weight;
        return totalWeightedScore;
      },
      0,
    );

    return weightedScore;
  }
}
