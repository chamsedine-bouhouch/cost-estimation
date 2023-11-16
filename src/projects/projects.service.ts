import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './models/project.model';
import { Model } from 'mongoose';
import { CreateAnswerDto, CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { QuestionsService } from 'src/questions/questions.service';
import { Answer } from './models/answer.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
    private readonly questionService: QuestionsService,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findOne(projectId: string): Promise<Project> {
    // Use the model type to specify the result type of findById
    const project = await this.projectModel
      .findById<Project>(projectId)
      .populate('answers.question_id');

    // Calculate the weighted score asynchronously
    const score = await this.calculateWeightedScore(projectId);

    // Add the calculated score to the project
    project.score = score;

    return project;
  }

  async update(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectModel.findByIdAndUpdate(
      projectId,
      updateProjectDto,
      { new: true },
    );
  }

  async deleteProject(projectId: string) {
    return this.projectModel.findByIdAndDelete(projectId);
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
      throw new Error('Duplicate question_id found. Answer cannot be added.');
    }

    // Add the new answer if question_id is unique
    return await this.projectModel.findByIdAndUpdate(
      { _id: projectId },
      { $push: { answers: answer } },
    );
  }

  async deleteAnswerFromProject(projectId: string, questionId: string) {
    const answer = this.getAnswer(projectId, questionId);
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      { _id: projectId },
      {
        $pull: {
          answers: answer,
        },
      },
    );
    return updatedProject;
  }

  async getAnswer(projectId: string, questionId: string): Promise<Answer> {
    const project = await this.projectModel.findById(projectId);
    const answer = project.answers.find(
      (a) => a.question_id.toString() == questionId,
    );
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
