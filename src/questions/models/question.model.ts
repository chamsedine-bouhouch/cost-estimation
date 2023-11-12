import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { projectTypeEnum } from 'src/core/enums/projectTypeEnum';
@Schema({
  timestamps: true,
})
export class Question {
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ enum: projectTypeEnum })
  @Prop({ type: String, enum: projectTypeEnum })
  type: projectTypeEnum;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
