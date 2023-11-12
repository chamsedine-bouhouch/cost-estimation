import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { projectTypeEnum } from 'src/core/enums/projectTypeEnum';
import { QuestionTypeEnum } from 'src/core/enums/questionTypeEnum';
@Schema({
  timestamps: true,
})
export class Question {
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ enum: projectTypeEnum, required: true })
  @Prop({ project_type: String, enum: projectTypeEnum })
  project_type: projectTypeEnum;

  @ApiProperty({ enum: QuestionTypeEnum })
  @Prop({
    question_type: String,
    enum: QuestionTypeEnum,
    default: QuestionTypeEnum.Text,
  })
  question_type: QuestionTypeEnum;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
