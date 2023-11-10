import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './models/project.model';
import { CreateAnswerDto, CreateProjectDto } from './dtos/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.createProject(createProjectDto);
  }
  @Get()
  projectList() {
    return this.projectsService.findAll();
  }

  @Get('/:id')
  getProject(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() createAnswerDto: CreateAnswerDto) {
    return this.projectsService.addAnswerToProject(id, createAnswerDto);
  }
}
