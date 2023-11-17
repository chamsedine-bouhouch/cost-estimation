import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { QuestionTypeEnum } from 'src/core/enums/questionTypeEnum';

@Schema({
  timestamps: true,
})
export class Question {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  project_category: MongooseSchema.Types.ObjectId;

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
