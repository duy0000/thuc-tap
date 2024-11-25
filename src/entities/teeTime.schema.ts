import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
//khai baos kieeur mà data fe gửi về phải chuẩn theo
class priceWeek {
  @Prop({ required: true })
  day: string;

  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  sale: number;
}

@Schema()
export class TeeTime extends Document {
  @Prop({ required: true })
  timeStart: string;

  @Prop({ required: true })
  Caddie: number;

  @Prop({ required: true })
  people: number;

  @Prop({ required: true })
  car: number;

  @Prop({ type: [priceWeek], default: [] }) // Mảng orders
  priceWeek: priceWeek[];
}

export const TeeTimeSchema = SchemaFactory.createForClass(TeeTime);
