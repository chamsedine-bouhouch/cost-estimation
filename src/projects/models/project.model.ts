import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { projectTypeEnum } from 'src/core/enums/projectTypeEnum';

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
  type: projectTypeEnum;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
