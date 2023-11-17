import { ProjectTypeEnum } from 'src/core/enums/projectTypeEnum';

export class CreateQuestionDto {
  name: string;
  project_type: ProjectTypeEnum;
  options: [string];
}
