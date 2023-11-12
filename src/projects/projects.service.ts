import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer, Project } from './models/project.model';
import { Model } from 'mongoose';
import { CreateAnswerDto, CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findOne(projectId: string): Promise<Project> {
    return this.projectModel.findById(projectId);
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
}
