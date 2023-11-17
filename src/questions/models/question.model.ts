import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectTypeEnum } from 'src/core/enums/projectTypeEnum';
import { QuestionTypeEnum } from 'src/core/enums/questionTypeEnum';
@Schema({
  timestamps: true,
})
export class Question {
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ enum: ProjectTypeEnum, required: true })
  @Prop({ project_type: String, enum: ProjectTypeEnum })
  project_type: ProjectTypeEnum;

  @ApiProperty({ enum: QuestionTypeEnum })
  @Prop({
    question_type: String,
    enum: QuestionTypeEnum,
    default: QuestionTypeEnum.Text,
  })
  question_type: QuestionTypeEnum;

  @Prop({ type: Number, required: true })
  weight: number;

  @Prop()
  options: [string];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
