import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './models/project.model';
import { Model } from 'mongoose';
import { CreateAnswerDto, CreateProjectDto } from './dtos/create-project.dto';

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

  async addAnswerToProject(isProject: string, answer: CreateAnswerDto) {
    await this.projectModel.findByIdAndUpdate(
      { _id: isProject },
      { $push: { answers: answer } },
    );
  }

  async deleteProject(projectId: string) {
    return this.projectModel.findByIdAndDelete(projectId);
  }
}
