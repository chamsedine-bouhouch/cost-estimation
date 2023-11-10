import { projectTypeEnum } from 'src/core/enums/projectTypeEnum';

export class CreateQuestionDto {
  name: string;
  type: projectTypeEnum;
}
