import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Answer } from './answer.model';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  project_category: MongooseSchema.Types.ObjectId;

  @Prop({ type: [Object] })
  answers: Answer[];

  @Prop()
  score: number;
}

export type ProjectDocument = Project & Document;

export const ProjectSchema = SchemaFactory.createForClass(Project);
