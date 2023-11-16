import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Answer {
  @Prop({ type: String, required: true, unique: true, index: true })
  question_id: string;

  @Prop({ type: String, required: true })
  answer: string;

  @Prop({ type: Number, required: true })
  weight: number;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
