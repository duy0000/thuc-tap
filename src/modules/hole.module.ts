import { MongooseModule } from "@nestjs/mongoose";
import { HoleController } from "../controllers/golfHole.controller";
import { Module } from "@nestjs/common";
import { HoleService } from "../services/hole.service";
import { Hole, HoleSchema } from "../entities/hole.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Hole.name,
        schema: HoleSchema,
      },
    ]),
  ],
  controllers: [HoleController],
  providers: [HoleService], //nhận dữ liệu từ fe chuyển cho service xử lí 1 tác vụ khác biệt
})
export class HoleModule {}
