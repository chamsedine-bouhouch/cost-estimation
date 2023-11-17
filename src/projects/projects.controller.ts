import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { Project } from './models/project.model';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { CreateAnswerDto } from './dtos/create-answer.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.getProjects();
  }

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.createProject(createProjectDto);
  }

  @Get('/:id')
  getProject(@Param('id') id: string) {
    return this.projectsService.getProject(id);
  }
  @Get('/:id/calculateWeightedScore')
  calculateWeightedScore(@Param('id') projectId: string) {
    return this.projectsService.calculateWeightedScore(projectId);
  }

  @Get('/:id/answer/:questionId')
  getAnswer(@Param('id') id: string, @Param('questionId') questionId: string) {
    return this.projectsService.getAnswer(id, questionId);
  }

  @Patch('/:id')
  updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(id, updateProjectDto);
  }

  @Patch('/:id/add-answer')
  addAnswer(@Param('id') id: string, @Body() createAnswerDto: CreateAnswerDto) {
    return this.projectsService.addAnswerToProject(id, createAnswerDto);
  }

  @Patch('/:id/remove-answer')
  removeAnswer(@Param('id') id: string, @Body() questionId: string) {
    return this.projectsService.deleteAnswerFromProject(id, questionId);
  }

  @Delete('/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
