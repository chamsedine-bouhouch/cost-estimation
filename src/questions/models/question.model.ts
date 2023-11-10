import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { projectTypeEnum } from 'src/core/enums/projectTypeEnum';
@Schema({
  timestamps: true,
})
export class Question {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, enum: projectTypeEnum })
  type: projectTypeEnum;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
