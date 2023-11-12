import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { projectTypeEnum } from 'src/core/enums/projectTypeEnum';

@Schema()
export class Answer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => 'Question' })
  question_id: string;

  @Prop({ type: String, required: true })
  answer: string;

  @Prop({ type: Number, default: 1 })
  weight: number;
}

@Schema({
  timestamps: true,
})
export class Project {
  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @ApiProperty({ enum: projectTypeEnum })
  @Prop({ type: String, enum: projectTypeEnum })
  project_type: projectTypeEnum;

  @Prop([Answer])
  answers: Answer[];

  @Prop()
  score: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
