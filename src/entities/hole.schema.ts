import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
//khai baos kieeur mà data fe gửi về phải chuẩn theo
@Schema()
export class Hole extends Document {
  @Prop({ required: true })
  nameHole: string;
  @Prop({ required: true })
  describeHole: string;
  @Prop()
  linkImageHole: string;
  @Prop({ required: true })
  titleHole: string;
}

export const HoleSchema = SchemaFactory.createForClass(Hole);
