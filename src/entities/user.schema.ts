import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
//khai baos kieeur mà data fe gửi về phải chuẩn theo
@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  username: string;
  @Prop()
  password: string;
  @Prop({ required: true })
  gmail: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  role: string;
  @Prop()
  avatar: string;
  @Prop()
  createAt: string;
  @Prop()
  updateAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
