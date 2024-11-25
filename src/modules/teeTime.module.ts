import { MongooseModule } from "@nestjs/mongoose";
import { TeeTimeController } from "../controllers/teeTime.controller";
import { Module } from "@nestjs/common";
import { TeeTimeService } from "../services/teeTime.service";
import { TeeTime, TeeTimeSchema } from "../entities/teeTime.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TeeTime.name,
        schema: TeeTimeSchema,
      },
    ]),
  ],
  controllers: [TeeTimeController],
  providers: [TeeTimeService], //nhận dữ liệu từ fe chuyển cho service xử lí 1 tác vụ khác biệt
})
export class TeetimeModule {}
