import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { projectTypeEnum } from 'src/core/enums/projectTypeEnum';
@Schema({
  timestamps: true,
})
export class Question {
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ enum: projectTypeEnum, required: true })
  @Prop({ project_type: String, enum: projectTypeEnum })
  project_type: projectTypeEnum;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
